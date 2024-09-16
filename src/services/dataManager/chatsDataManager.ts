/* eslint-disable no-param-reassign */
import { StorageKeys } from '@globals/storageKeys';
import { MessageApi } from '@services/api/message.api';
import { SecureStore } from '@services/secureStore';
import { Chat, MessagingCredentials } from '@types';
import { cryptoHelpers, globalHelpers } from '@utils';

export class ChatsDataManager {
  public static chats: Chat[] = [];

  public static async decryptMessages(chatsToDecrypt: Chat[]) {
    const messagingCredentials = (await SecureStore.getItem(
      StorageKeys.MESSAGING_CREDENTIALS,
      true
    )) as MessagingCredentials | undefined;

    const privateKey = await SecureStore.getItem(StorageKeys.PRIVATE_KEY);

    if (messagingCredentials && privateKey) {
      const decryptedChats = chatsToDecrypt.map((item) => {
        item.messages = item.messages.map((value) => {
          if (value.text) {
            value.text = cryptoHelpers.decryptMessage(
              privateKey as string,
              messagingCredentials.messagingKey,
              value.text
            );
          }
          return value;
        });
        return item;
      });

      return decryptedChats;
    }

    return chatsToDecrypt;
  }

  public static async fetchChats() {
    try {
      const response = await MessageApi.getConversations(undefined);

      this.chats = await this.decryptMessages(response);
    } catch (e: any) {
      /* empty */
    }
  }

  public static async loadMoreChats(lastChat: Chat, onNoMore: () => void) {
    try {
      const response = await MessageApi.getConversations(
        globalHelpers.getPaginationToken(lastChat)
      );

      if (response.length === 0) {
        onNoMore();
      }

      this.chats = [...this.chats, ...(await this.decryptMessages(response))];
    } catch (e: any) {
      /* empty */
    }
  }

  public static async pullToRefresh() {
    try {
      const response = await MessageApi.getConversations(undefined, 24);
      this.chats = await this.decryptMessages(response);
    } catch (e: any) {
      /* empty */
    }
  }
}
