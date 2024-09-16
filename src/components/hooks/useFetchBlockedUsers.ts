import { Globals } from '@globals/globals';
import { CacheManager, UserBlockApi } from '@services';
import { UserBlock } from '@types';
import { globalHelpers } from '@utils/globalHelpers';
import { useCallback, useEffect, useState } from 'react';

export const useFetchBlockedUsers = () => {
  const blockedUsersCache = CacheManager.blockedUsers.get(Globals.userId);
  const [blockedUsers, setBlockedUsers] = useState<UserBlock[]>(
    blockedUsersCache ?? []
  );
  const [loading, setLoading] = useState(
    blockedUsersCache === undefined ?? true
  );
  const [lastUser, setLastUser] = useState<UserBlock | undefined>(
    blockedUsersCache
      ? blockedUsersCache[blockedUsersCache.length - 1]
      : undefined
  );
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const getBlockedUsers = useCallback(async () => {
    try {
      const response = await UserBlockApi.getBlockedUsers(
        globalHelpers.getPaginationToken(lastUser)
      );
      if (response.length === 0) {
        setNoMore(true);
      }
      setBlockedUsers((prev) => [...prev, ...response]);
    } catch (e: any) {
      /* empty */
    }
    setLoading(false);
    setIsLoadMore(false);
  }, [lastUser]);

  useEffect(() => {
    getBlockedUsers();
  }, [getBlockedUsers]);

  useEffect(() => {
    CacheManager.blockedUsers.set(Globals.userId, blockedUsers);
  }, [blockedUsers]);

  return {
    blockedUsers,
    setBlockedUsers,
    getBlockedUsers,
    loading,
    setLastUser,
    noMore,
    setIsLoadMore,
    isLoadMore,
  };
};
