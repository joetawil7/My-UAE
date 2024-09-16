/* eslint-disable no-param-reassign */
import { Globals } from '@globals/globals';
import { StorageKeys } from '@globals/storageKeys';
import { MessageApi } from '@services/api/message.api';
import { SecureStore } from '@services/secureStore';
import {
  ChatMessage,
  DecryptedMessageFile,
  MessagesSection,
  MessagingCredentials,
} from '@types';
import { cryptoHelpers, dateHelpers, globalHelpers } from '@utils';
import { FileSystemManager } from '../fileSystemManager';

export class DirectMessagesDataManager {
  public static directMessages: Map<string, MessagesSection[]> = new Map();

  public static updateSections(
    userId: string,
    unGroupedMessages: ChatMessage[],
    force?: boolean
  ) {
    const sections: MessagesSection[] = force
      ? []
      : this.directMessages.get(userId) ?? [];
    const groupedMessages = this.groupMessagesByDay(unGroupedMessages);

    const keys = Object.keys(groupedMessages);

    for (const key of keys) {
      const messages = groupedMessages[key];
      const existedSection = sections.find((section) => {
        return section.date === key;
      });

      if (existedSection) {
        existedSection.data.push(...messages);
      } else {
        const newSection: MessagesSection = {
          date: key,
          data: messages,
        };

        sections.push(newSection);
      }
    }

    return sections;
  }

  public static groupMessagesByDay(messages: ChatMessage[]): {
    [key: string]: ChatMessage[];
  } {
    const dayMessagesMap: { [key: string]: ChatMessage[] } = {};
    for (let i = 0; i < messages.length; i++) {
      const messageTime = new Date(messages[i].createdAt);

      const formattedMessageDate = dateHelpers.isToday(messageTime)
        ? 'Today'
        : dateHelpers.formatDate(messageTime);

      if (!dayMessagesMap[formattedMessageDate]) {
        dayMessagesMap[formattedMessageDate] = [];
      }
      dayMessagesMap[formattedMessageDate].push(messages[i]);
    }

    return dayMessagesMap;
  }

  public static async decryptMessage(
    message: ChatMessage,
    content: DecryptedMessageFile,
    serverPublicKey?: string,
    privateKey?: string
  ) {
    if (serverPublicKey && privateKey && message.text) {
      const decryptedText = cryptoHelpers.decryptMessage(
        privateKey as string,
        serverPublicKey as string,
        message.text
      );

      content[message.id] = decryptedText;

      return decryptedText;
    }

    return message.text;
  }

  public static async getDecryptedMessages(
    messagesToDecrypt: ChatMessage[],
    userId: string
  ) {
    const messagingCredentials = (await SecureStore.getItem(
      StorageKeys.MESSAGING_CREDENTIALS,
      true
    )) as MessagingCredentials | undefined;

    const privateKey = await SecureStore.getItem(StorageKeys.PRIVATE_KEY);

    let content: DecryptedMessageFile =
      (await FileSystemManager.readDocumentFile(`messages/${userId}`)) ?? {};
    const messagesDate: string | undefined =
      await FileSystemManager.readDocumentFile(
        `messagesDateWithUser/${userId}`
      );

    if (messagesDate) {
      const expired =
        new Date().getTime() - new Date(messagesDate).getTime() >
        7 * 24 * 60 * 60 * 1000;
      if (expired) {
        content = {};
      }
    }

    await FileSystemManager.writeDocumentFile(
      `messagesDateWithUser/${userId}`,
      new Date().toISOString()
    );

    const decryptedMessages: ChatMessage[] = [];
    for (const item of messagesToDecrypt) {
      let decryptedMessage = content[item.id];
      if (!decryptedMessage && item.text) {
        // eslint-disable-next-line no-await-in-loop
        decryptedMessage = await this.decryptMessage(
          item,
          content,
          messagingCredentials?.messagingKey,
          privateKey
        );
      }

      decryptedMessages.push({
        ...item,
        text: decryptedMessage ?? item.text,
        received: item.senderUserId !== Globals.userId,
      });
    }

    await FileSystemManager.writeDocumentFile(`messages/${userId}`, content);

    return decryptedMessages;
  }

  public static async fetchUserDirectMessages(userId: string, count?: number) {
    try {
      const response = await MessageApi.getUserConversation(
        userId,
        undefined,
        count
      );

      const decryptedMessages = await this.getDecryptedMessages(
        response,
        userId
      );
      const newSections = this.updateSections(userId, decryptedMessages, true);
      this.directMessages.set(userId, newSections);
    } catch (e: any) {
      /* empty */
    }
  }

  public static async loadMoreDirectMessages(
    userId: string,
    lastMessage: ChatMessage,
    onNoMore: () => void
  ) {
    try {
      const response = await MessageApi.getUserConversation(
        userId,
        globalHelpers.getPaginationToken(lastMessage)
      );

      if (response.length === 0) {
        onNoMore();
      }

      this.directMessages.set(
        userId,
        this.updateSections(
          userId,
          await this.getDecryptedMessages(response, userId)
        )
      );
    } catch (e: any) {
      /* empty */
    }
  }

  public static async pullToRefresh(userId: string) {
    try {
      const response = await MessageApi.getUserConversation(
        userId,
        undefined,
        24
      );
      this.directMessages.set(
        userId,
        this.updateSections(
          userId,
          await this.getDecryptedMessages(response, userId)
        )
      );
    } catch (e: any) {
      /* empty */
    }
  }
}
