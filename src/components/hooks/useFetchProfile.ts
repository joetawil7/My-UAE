import {
  UserApi,
  RequestQueue,
  useAuthentication,
  CacheManager,
} from '@services';
import { UserInfo } from '@types';
import { useCallback, useEffect, useState } from 'react';

export const useFetchProfile = (user?: UserInfo) => {
  const { authenticatedUser } = useAuthentication();

  const isOwnProfile = !user || user?.id === authenticatedUser?.id;

  const [profile, setProfile] = useState<UserInfo>(
    isOwnProfile
      ? (authenticatedUser as UserInfo)
      : CacheManager.profile.get(user.id) ?? (user as UserInfo)
  );

  const getUserInfo = useCallback(async () => {
    let response: UserInfo;
    if (isOwnProfile) {
      response = await RequestQueue.executeInQueue(
        'userRequest',
        authenticatedUser?.id as string,
        () => UserApi.getUser(authenticatedUser?.id as string, true, false)
      );
    } else {
      response = await RequestQueue.executeInQueue('userRequest', user.id, () =>
        UserApi.getUser(user.id)
      );
      CacheManager.profile.set(user.id, response);
    }
    setProfile(response);
  }, [authenticatedUser?.id, isOwnProfile, user?.id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return {
    profile,
  };
};
