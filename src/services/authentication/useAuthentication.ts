import { Globals, StorageKeys } from '@globals';
import { AccountApi, AuthApi } from '@services/api';
import { setTokenData } from '@services/api/api.base';
import { authenticatedUserAtom } from '@services/atoms';
import { SecureStore } from '@services/secureStore';
import { LocalUser, UserInfo, UserState } from '@types';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

export const useAuthentication = () => {
  const [authenticatedUser, setAuthenticatedUser] = useAtom(
    authenticatedUserAtom
  );

  const setCurrentUser = useCallback(
    async (_authenticatedUser: UserInfo) => {
      const localUser: LocalUser = {
        id: _authenticatedUser.id,
        accessToken: _authenticatedUser.accessToken as string,
        refreshToken: _authenticatedUser.refreshToken as string,
        userState: _authenticatedUser.userState as UserState,
      };

      await SecureStore.setItem(StorageKeys.CURRENT_USER, localUser, true);

      Globals.userId = _authenticatedUser.id;

      setTokenData(_authenticatedUser.accessToken as string);
      setAuthenticatedUser(_authenticatedUser);
    },
    [setAuthenticatedUser]
  );

  const refreshCurrentUser = useCallback(async () => {
    const currentUser = (await SecureStore.getItem(
      StorageKeys.CURRENT_USER,
      true
    )) as LocalUser;

    if (currentUser) {
      Globals.userId = currentUser.id;

      try {
        const refreshedUser = await AccountApi.getMyUserInfo();

        setAuthenticatedUser({ ...currentUser, ...refreshedUser });
      } catch (e) {
        /* empty */
      }
    } else {
      setAuthenticatedUser(undefined);
    }
  }, [setAuthenticatedUser]);

  const upgradeRefreshToken = useCallback(async () => {
    const currentUser = (await SecureStore.getItem(
      StorageKeys.CURRENT_USER,
      true
    )) as LocalUser;

    if (!currentUser) {
      throw Error('User is not authorized');
    }

    const _authenticatedUser: UserInfo = await AuthApi.upgradeRefreshToken(
      currentUser.refreshToken
    );

    await setCurrentUser(_authenticatedUser);
  }, [setCurrentUser]);

  const clearCurrentUser = useCallback(async () => {
    await SecureStore.deleteItem(StorageKeys.CURRENT_USER);
    await SecureStore.deleteItem(StorageKeys.MESSAGING_CREDENTIALS);

    setAuthenticatedUser(undefined);
  }, [setAuthenticatedUser]);

  const removeAuthenticatedUser = useCallback(
    async (userId: string) => {
      const authenticatedUsers =
        ((await SecureStore.getItem(
          StorageKeys.AUTHENTICATED_USERS,
          true
        )) as LocalUser[]) ?? [];

      if (authenticatedUsers.length === 1) {
        await clearCurrentUser();
      }

      if (authenticatedUsers?.length > 0) {
        const index = authenticatedUsers.findIndex(
          (user) => user.id === userId
        );
        authenticatedUsers.splice(index, 1);
        await SecureStore.setItem(
          StorageKeys.AUTHENTICATED_USERS,
          authenticatedUsers,
          true
        );
      }
    },
    [clearCurrentUser]
  );

  const addAuthenticatedUser = useCallback(
    async (_authenticatedUser: UserInfo) => {
      const authenticatedUsers =
        ((await SecureStore.getItem(
          StorageKeys.AUTHENTICATED_USERS,
          true
        )) as LocalUser[]) ?? [];

      const localUser: LocalUser = {
        id: _authenticatedUser.id,
        accessToken: _authenticatedUser.accessToken as string,
        refreshToken: _authenticatedUser.refreshToken as string,
        userState: _authenticatedUser.userState as UserState,
      };

      authenticatedUsers.push(localUser);
      await SecureStore.setItem(
        StorageKeys.AUTHENTICATED_USERS,
        authenticatedUsers,
        true
      );
    },
    []
  );

  const getAuthenticatedUsers = useCallback(async () => {
    const authenticatedUsers =
      ((await SecureStore.getItem(
        StorageKeys.AUTHENTICATED_USERS,
        true
      )) as LocalUser[]) ?? [];

    return authenticatedUsers;
  }, []);

  const clearAuthenticatedUsers = useCallback(async () => {
    await SecureStore.deleteItem(StorageKeys.AUTHENTICATED_USERS);
  }, []);

  return {
    authenticatedUser,
    setAuthenticatedUser,
    setCurrentUser,
    upgradeRefreshToken,
    refreshCurrentUser,
    clearCurrentUser,
    removeAuthenticatedUser,
    addAuthenticatedUser,
    getAuthenticatedUsers,
    clearAuthenticatedUsers,
  };
};
