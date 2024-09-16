import React, { useCallback, useEffect, useMemo } from 'react';
import { ScreenShell, ActivityIndicator, Text } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { NavigationHeader } from '@components/navigationHeader';
import { useFetchNotifications } from '@components/hooks';
import { FlatList, RefreshControl } from 'react-native';
import { Events, UserNotification } from '@types';
import { useTranslate } from '@localization';
import { NotificationsApi } from '@services/api';
import { EventRegister } from 'react-native-event-listeners';
import { FollowRequestsDataManager } from '@services/dataManager';
import { NotificationListItem } from './components/notificationListItem';
import { NotificationFollowRequestsDisplay } from './components/notificationFollowRequestsDisplay';

export const NotificationsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationsScreen>
> = () => {
  const {
    notifications,
    isLoadMore,
    isLoading,
    onPullToRefresh,
    refreshing,
    loadMoreNotifications,
    followerRequestsInfo,
    setLastSeenDate,
    lastSeenDate,
  } = useFetchNotifications();

  const { t } = useTranslate();

  const setLastSeenNotification = useCallback(async () => {
    try {
      await NotificationsApi.sendLastSeenNotification(
        notifications[0].createdAt
      );
      setLastSeenDate(notifications[0].createdAt);
      EventRegister.emit(Events.NOTIFICATIONS_UNSEEN_COUNT, { count: 0 });
    } catch (e: any) {
      /* Empty */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLastSeenDate]);

  useEffect(() => {
    return () => {
      setLastSeenNotification();
    };
  }, [setLastSeenNotification]);

  useEffect(() => {
    FollowRequestsDataManager.fetchFollowerRequests();
    FollowRequestsDataManager.fetchFollowingRequests();
  }, []);

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: UserNotification }) => {
      return (
        <NotificationListItem notification={item} lastSeenDate={lastSeenDate} />
      );
    },
    [lastSeenDate]
  );

  const keyExtractor = (item: UserNotification) => `${item.id}`;

  const renderFooter = useMemo(
    () => (isLoadMore ? <ActivityIndicator marginBottom='s' /> : undefined),
    [isLoadMore]
  );

  const renderEmptyComponent = isLoading ? (
    <ActivityIndicator marginTop='m' />
  ) : (
    <Text textAlign='center'>{t('no_follower_requests')}</Text>
  );

  return (
    <ScreenShell withoutBottom>
      <NavigationHeader withBack title={t('notifications')} />

      <FlatList
        data={notifications}
        ListHeaderComponent={
          <NotificationFollowRequestsDisplay info={followerRequestsInfo} />
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreNotifications}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onPullToRefresh}
            tintColor='#fff'
          />
        }
      />
    </ScreenShell>
  );
};
