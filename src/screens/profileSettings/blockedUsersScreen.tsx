import React, { useCallback } from 'react';
import { ActivityIndicator, ScreenShell, Text } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { NavigationHeader } from '@components/navigationHeader';
import { UserBlockApi } from '@services/api';
import { useFetchBlockedUsers } from '@components/hooks';
import { FlatList, ListRenderItem } from 'react-native';
import { UserBlock, UserInfo } from '@types';
import { BlockedUserListItem } from './components/blockedUserListItem';

export const BlockedUsersScreen: React.FC<
  RootStackScreenProps<NavigationElement.BlockedUsersScreen>
> = () => {
  const { blockedUsers, setBlockedUsers, getBlockedUsers, loading } =
    useFetchBlockedUsers();

  const { t } = useTranslate();

  const unblockUser = useCallback(
    async (userId: string) => {
      const blockedUsersCopy = [...blockedUsers];
      const itemIndex = blockedUsersCopy.findIndex(
        (item) => item.id === userId
      );
      if (itemIndex > -1) {
        blockedUsersCopy.splice(itemIndex, 1);
      }
      setBlockedUsers(blockedUsersCopy);
      try {
        await UserBlockApi.unblockUser(userId);
      } catch (e: any) {
        await getBlockedUsers();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getBlockedUsers, setBlockedUsers]
  );

  const renderItem: ListRenderItem<UserBlock> = useCallback(
    ({ item }) => {
      return (
        <BlockedUserListItem
          user={item.blockedUser}
          onUnblock={() => unblockUser(item.blockedUser.id)}
        />
      );
    },
    [unblockUser]
  );

  const keyExtractor = (item: UserInfo) => item.id;

  const renderEmptyComponent = loading ? (
    <ActivityIndicator />
  ) : (
    <Text textAlign='center'>{t('no_blocked_users')}</Text>
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader
        title={t('blocked_accounts')}
        marginBottom='m'
        withBack
      />
      <FlatList
        data={blockedUsers}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingHorizontal: 16,
        }}
        ListEmptyComponent={renderEmptyComponent}
      />
    </ScreenShell>
  );
};
