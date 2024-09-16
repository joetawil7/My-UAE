import { Globals } from '@globals/globals';
import { StorageKeys } from '@globals/storageKeys';
import { DirectMessagesDataManager, MessageApi, SecureStore } from '@services';
import { Media, MessagesSection, MessagingCredentials } from '@types';
import { cryptoHelpers } from '@utils/cryptoHelper';
import { useCallback, useState } from 'react';

export const useFetchDirectMessages = () => {
  const [directMessages, setDirectMessages] = useState<
    Map<string, MessagesSection[]>
  >(DirectMessagesDataManager.directMessages);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getDirectMessages = useCallback(async (userId: string) => {
    try {
      if (
        !DirectMessagesDataManager.directMessages.has(userId) ||
        (
          DirectMessagesDataManager.directMessages.get(
            userId
          ) as MessagesSection[]
        ).length === 0
      ) {
        setIsLoading(true);
        await DirectMessagesDataManager.fetchUserDirectMessages(userId);
        setNoMore(false);
        setDirectMessages(DirectMessagesDataManager.directMessages);
      }
    } catch (e: any) {
      /* empty */
    }
    setIsLoading(false);
  }, []);

  const loadMoreDirectMessages = useCallback(
    async (userId: string) => {
      if (
        directMessages.has(userId) &&
        (directMessages.get(userId) as MessagesSection[]).length !== 0 &&
        !noMore &&
        !isLoadMore
      ) {
        setIsLoadMore(true);
        await DirectMessagesDataManager.loadMoreDirectMessages(
          userId,
          (directMessages.get(userId) as MessagesSection[])[
            (directMessages.get(userId) as MessagesSection[]).length - 1
          ].data[
            (directMessages.get(userId) as MessagesSection[])[
              (directMessages.get(userId) as MessagesSection[]).length - 1
            ].data.length - 1
          ],
          () => setNoMore(true)
        );
        setIsLoadMore(false);
      }
    },
    [directMessages, isLoadMore, noMore]
  );

  const onPullToRefresh = useCallback(async (userId: string) => {
    setRefreshing(true);
    try {
      await DirectMessagesDataManager.fetchUserDirectMessages(userId, 24);
      setNoMore(false);
      setDirectMessages(DirectMessagesDataManager.directMessages);
    } catch (e: any) {
      /* empty */
    }
    setRefreshing(false);
  }, []);

  const sendMessage = useCallback(
    async (userId: string, text: string, media?: Media) => {
      const randomId = Math.floor(Math.random() * 99999).toString();
      try {
        setDirectMessages((prev) => {
          const updatedSections = prev.get(userId) as MessagesSection[];
          updatedSections[0].data.reverse().push({
            createdAt: new Date().toISOString(),
            id: randomId,
            receiverUserId: userId,
            senderUserId: Globals.userId,
            text,
            media,
          });

          updatedSections[0].data.reverse();

          prev.set(userId, updatedSections);
          return prev;
        });
        const privateKey = await SecureStore.getItem(StorageKeys.PRIVATE_KEY);
        const messagingCredentials = (await SecureStore.getItem(
          StorageKeys.MESSAGING_CREDENTIALS,
          true
        )) as MessagingCredentials | undefined;

        if (privateKey && messagingCredentials) {
          let encryptedMessage = text;
          if (text && text.length > 0) {
            encryptedMessage = cryptoHelpers.encryptMessage(
              privateKey as string,
              messagingCredentials.messagingKey,
              text
            );
          }
          const response = await MessageApi.sendMessage(
            userId,
            encryptedMessage,
            media
          );
          setDirectMessages((prev) => {
            const updatedSections = prev.get(userId) as MessagesSection[];
            const index = updatedSections[0].data.findIndex(
              (item) =>
                item.text === text &&
                item.senderUserId === Globals.userId &&
                item.id === randomId
            );
            if (index && index > -1) {
              updatedSections[0].data[index].id = response.id;
            }
            prev.set(userId, updatedSections);
            return prev;
          });
        }
      } catch (e: any) {
        setDirectMessages((prev) => {
          const updatedSections = prev.get(userId) as MessagesSection[];
          const index = updatedSections[0].data.findIndex(
            (item) =>
              item.text === text &&
              item.senderUserId === Globals.userId &&
              item.id === randomId
          );
          if (index && index > -1) {
            updatedSections[updatedSections.length - 1].data.splice(index, 1);
          }

          prev.set(userId, updatedSections);
          return prev;
        });
      }
    },
    []
  );

  return {
    directMessages,
    setDirectMessages,
    getDirectMessages,
    setIsLoadMore,
    noMore,
    isLoadMore,
    isLoading,
    setIsLoading,
    loadMoreDirectMessages,
    onPullToRefresh,
    refreshing,
    sendMessage,
  };
};
