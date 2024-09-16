import { FollowRequestsDataManager } from '@services';
import {
  Events,
  FollowerRequest,
  FollowingRequest,
  NewNotificationEvent,
} from '@types';
import { useCallback, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export const useFetchFollowerRequests = () => {
  const [followerRequests, setFollowerRequests] = useState<FollowerRequest[]>(
    FollowRequestsDataManager.followerRequests
  );
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getFollowerRequests = useCallback(async () => {
    try {
      if (FollowRequestsDataManager.followerRequests.length === 0) {
        setIsLoading(true);
      }
      await FollowRequestsDataManager.fetchFollowerRequests();
      setFollowerRequests(FollowRequestsDataManager.followerRequests);
    } catch (e: any) {
      /* empty */
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getFollowerRequests();
  }, [getFollowerRequests]);

  const loadMoreFollowerRequests = useCallback(async () => {
    if (followerRequests.length >= 10 && !noMore) {
      setIsLoadMore(true);
      await FollowRequestsDataManager.loadMoreFollowerRequests(
        followerRequests[followerRequests.length - 1],
        () => setNoMore(true)
      );
      setIsLoadMore(false);
    }
  }, [followerRequests, noMore]);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await FollowRequestsDataManager.pullToRefreshFollowerRequests();
      setFollowerRequests(FollowRequestsDataManager.followerRequests);
    } catch (e: any) {
      /* empty */
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const newNotificationSub = EventRegister.on(
      Events.NEW_NOTIFICATION,
      async (data: NewNotificationEvent) => {
        if (data.notification.type === 'SentFollowRequest') {
          setFollowerRequests((prev) => [
            {
              createdAt: data.notification.createdAt,
              id: data.notification.id,
              senderUser: data.notification.executorUser,
            },
            ...prev,
          ]);
        }
      }
    );

    return () => {
      EventRegister.rm(newNotificationSub as string);
    };
  }, []);

  useEffect(() => {
    FollowRequestsDataManager.followerRequests = followerRequests;
  }, [followerRequests]);

  return {
    followerRequests,
    setFollowerRequests,
    setIsLoadMore,
    noMore,
    isLoadMore,
    isLoading,
    setIsLoading,
    loadMoreFollowerRequests,
    onPullToRefresh,
    refreshing,
  };
};

export const useFetchFollowingRequests = () => {
  const [followingRequests, setFollowingRequests] = useState<
    FollowingRequest[]
  >(FollowRequestsDataManager.followingRequests);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getFollowingRequests = useCallback(async () => {
    try {
      if (FollowRequestsDataManager.followingRequests.length === 0) {
        setIsLoading(true);
      }
      await FollowRequestsDataManager.fetchFollowingRequests();
      setFollowingRequests(FollowRequestsDataManager.followingRequests);
    } catch (e: any) {
      /* empty */
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getFollowingRequests();
  }, [getFollowingRequests]);

  const loadMoreFollowingRequests = useCallback(async () => {
    if (followingRequests.length >= 10 && !noMore) {
      setIsLoadMore(true);
      await FollowRequestsDataManager.loadMoreFollowingRequests(
        followingRequests[followingRequests.length - 1],
        () => setNoMore(true)
      );
      setIsLoadMore(false);
    }
  }, [followingRequests, noMore]);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await FollowRequestsDataManager.pullToRefreshFollowingRequests();
      setFollowingRequests(FollowRequestsDataManager.followingRequests);
    } catch (e: any) {
      /* empty */
    }
    setRefreshing(false);
  }, []);

  return {
    followingRequests,
    setFollowingRequests,
    setIsLoadMore,
    noMore,
    isLoadMore,
    setIsLoading,
    isLoading,
    loadMoreFollowingRequests,
    onPullToRefresh,
    refreshing,
  };
};
