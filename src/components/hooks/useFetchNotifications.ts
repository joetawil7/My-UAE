import { NotificationsApi, NotificationsDataManager } from '@services';
import {
  DeletedNotificationEvent,
  Events,
  FollowerRequest,
  NewNotificationEvent,
  NextAppStateEvent,
  NotificationsFollowRequestActionEvent,
  RemoveFollowRequestNotificationsEvent,
  UserNotification,
} from '@types';
import { useCallback, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export const useFetchNotifications = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>(
    NotificationsDataManager.notifications
  );
  const [followerRequestsInfo, setFollowerRequestsInfo] = useState(
    NotificationsDataManager.followerRequestsInfo
  );
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noMore, setNoMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastSeenDate, setLastSeenDate] = useState('');

  const getNotifications = useCallback(async () => {
    try {
      if (
        NotificationsDataManager.notifications.length === 0 ||
        !NotificationsDataManager.followerRequestsInfo
      ) {
        setIsLoading(true);
      }
      await NotificationsDataManager.fetchNotifications();
      setNotifications(NotificationsDataManager.notifications);
      setFollowerRequestsInfo(NotificationsDataManager.followerRequestsInfo);
    } catch (e: any) {
      /* empty */
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const loadMoreNotifications = useCallback(async () => {
    if (notifications.length >= 10 && !noMore) {
      setIsLoadMore(true);
      await NotificationsDataManager.loadMoreNotifications(
        notifications[notifications.length - 1],
        () => setNoMore(true)
      );

      setNotifications(NotificationsDataManager.notifications);
      setIsLoadMore(false);
    }
  }, [noMore, notifications]);

  const onPullToRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await NotificationsDataManager.pullToRefresh();
      setNotifications(NotificationsDataManager.notifications);
      setFollowerRequestsInfo(NotificationsDataManager.followerRequestsInfo);
    } catch (e: any) {
      /* empty */
    }
    setRefreshing(false);
  }, []);

  useEffect(() => {
    const refreshNotificationsSub = EventRegister.on(
      Events.REMOVE_FOLLOW_REQUEST_NOTIFICATIONS,
      async (data: RemoveFollowRequestNotificationsEvent) => {
        const notificationsCopy = [...notifications];
        const index = notificationsCopy.findIndex(
          (item: UserNotification) =>
            item.type === 'SentFollowRequest' &&
            item.executorUser?.id === data.userId
        );
        if (index > -1) {
          notificationsCopy.splice(index, 1);
        }

        NotificationsDataManager.notifications = notificationsCopy;
        setNotifications(notificationsCopy);
      }
    );

    const newNotificationSub = EventRegister.on(
      Events.NEW_NOTIFICATION,
      async (data: NewNotificationEvent) => {
        setNotifications((prev) => {
          const newNotifications = [data.notification, ...prev];
          NotificationsDataManager.notifications = newNotifications;
          return newNotifications;
        });

        if (data.notification.type === 'SentFollowRequest') {
          setFollowerRequestsInfo((prev) => {
            const newInfo = {
              count: prev.count + 1,
              receivedFollowRequests: [
                {
                  createdAt: data.notification.createdAt,
                  id: data.notification.actionId,
                  senderUser: data.notification.executorUser,
                },
                ...prev.receivedFollowRequests,
              ],
            };
            NotificationsDataManager.followerRequestsInfo = newInfo;
            return newInfo;
          });
        }
      }
    );

    const deletedNotificationSub = EventRegister.on(
      Events.DELETED_NOTIFICATION,
      async (data: DeletedNotificationEvent) => {
        const notificationsCopy = [...notifications];
        const index = notificationsCopy.findIndex(
          (item: UserNotification) => item.id === data.id && !item.softDeleted
        );
        if (index > -1) {
          notificationsCopy.splice(index, 1);
        }

        NotificationsDataManager.notifications = notificationsCopy;
        setNotifications(notificationsCopy);

        const followerRequestsInfoCopy = { ...followerRequestsInfo };
        const itemIndex =
          followerRequestsInfoCopy.receivedFollowRequests.findIndex(
            (item: FollowerRequest) => item.id === data.actionId
          );
        if (itemIndex > -1) {
          followerRequestsInfoCopy.receivedFollowRequests.splice(index, 1);
          followerRequestsInfoCopy.count -= 1;
        }

        NotificationsDataManager.followerRequestsInfo =
          followerRequestsInfoCopy;
        setFollowerRequestsInfo(followerRequestsInfoCopy);
      }
    );

    const notificationsFollowRequestActionSub = EventRegister.on(
      Events.NOTIFICATIONS_FOLLOW_REQUEST_ACTION,
      async (data: NotificationsFollowRequestActionEvent) => {
        setFollowerRequestsInfo((prev) => {
          const newInfo = {
            count: prev.count - 1,
            receivedFollowRequests: prev.receivedFollowRequests.filter(
              (item) => item.id !== data.id
            ),
          };
          NotificationsDataManager.followerRequestsInfo = newInfo;
          return newInfo;
        });
      }
    );

    const nextAppStateSub = EventRegister.on(
      Events.NEXT_APP_STATE,
      async (data: NextAppStateEvent) => {
        if (data.nextAppState === 'active') {
          await onPullToRefresh();
        }
      }
    );

    return () => {
      EventRegister.rm(refreshNotificationsSub as string);
      EventRegister.rm(newNotificationSub as string);
      EventRegister.rm(deletedNotificationSub as string);
      EventRegister.rm(notificationsFollowRequestActionSub as string);
      EventRegister.rm(nextAppStateSub as string);
    };
  }, [getNotifications, followerRequestsInfo, notifications, onPullToRefresh]);

  const getLastSeenDate = useCallback(async () => {
    try {
      const response = await NotificationsApi.getLastSeenNotification();
      setLastSeenDate(response.lastSeen);
    } catch (e: any) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getLastSeenDate();
  }, [getLastSeenDate]);

  return {
    notifications,
    setNotifications,
    isLoadMore,
    isLoading,
    onPullToRefresh,
    refreshing,
    loadMoreNotifications,
    followerRequestsInfo,
    lastSeenDate,
    setLastSeenDate,
  };
};
