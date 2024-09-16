import { ChatsDataManager } from '@services';
import { Chat, Events, NextAppStateEvent } from '@types';
import { useCallback, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export const useFetchChats = () => {
  const [chats, setChats] = useState<Chat[]>(ChatsDataManager.chats);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getChats = useCallback(async () => {
    try {
      if (ChatsDataManager.chats.length === 0) {
        setIsLoading(true);
      }
      await ChatsDataManager.fetchChats();
      setChats(ChatsDataManager.chats);
    } catch (e: any) {
      /* empty */
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getChats();
  }, [getChats]);

  const loadMoreChats = useCallback(async () => {
    if (chats.length >= 10 && !noMore) {
      setIsLoadMore(true);
      await ChatsDataManager.loadMoreChats(chats[chats.length - 1], () =>
        setNoMore(true)
      );
      setIsLoadMore(false);
    }
  }, [chats, noMore]);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await ChatsDataManager.pullToRefresh();
      setChats(ChatsDataManager.chats);
    } catch (e: any) {
      /* empty */
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const nextAppStateSub = EventRegister.on(
      Events.NEXT_APP_STATE,
      async (data: NextAppStateEvent) => {
        if (data.nextAppState === 'active') {
          await onPullToRefresh();
        }
      }
    );

    return () => {
      EventRegister.rm(nextAppStateSub as string);
    };
  }, [onPullToRefresh]);

  return {
    chats,
    setChats,
    setIsLoadMore,
    noMore,
    isLoadMore,
    isLoading,
    setIsLoading,
    loadMoreChats,
    onPullToRefresh,
    refreshing,
  };
};
