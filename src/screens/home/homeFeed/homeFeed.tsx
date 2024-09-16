import {
  CollapsibleHeaderFlashList,
  NormalPostItem,
  PostUploadingTemplate,
} from '@components';
import { Globals } from '@globals/globals';
import {
  ChatsDataManager,
  NotificationsDataManager,
  UserFeedApi,
} from '@services';
import { ListRenderItem } from '@shopify/flash-list';
import {
  DeletedNotificationEvent,
  Events,
  FollowerRequest,
  NewNotificationEvent,
  NormalPost,
  PostIsUploadingEvent,
  UserNotification,
} from '@types';
import React, { useCallback, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { View } from '@components/base';
import { HomeNotificationsButton } from './components/homeNotificationsButton';
import { HomeMessagesButton } from './components/homeMessagesButton';

export const HomeFeed = () => {
  const [feed, setFeed] = useState<NormalPost[]>();
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    const postUploadedSub = EventRegister.on(
      Events.POST_UPLOADED,
      (data: PostIsUploadingEvent) => {
        setTimeout(() => {
          const newFeed = feed ? [...feed] : [];
          if (data.normalPost) {
            const newPost: NormalPost = {
              id: '4234234',
              userId: Globals.userId,
              content: data.normalPost.content,
              media: data.normalPost.media ?? [],
              mentions: data.normalPost.mentions ?? [],
            };
            newFeed?.unshift(newPost);
          }

          setFeed(newFeed);
        }, 500);
      }
    );

    const newNotificationSub = EventRegister.on(
      Events.NEW_NOTIFICATION,
      async (data: NewNotificationEvent) => {
        NotificationsDataManager.notifications = [
          data.notification,
          ...NotificationsDataManager.notifications,
        ];

        if (data.notification.type === 'SentFollowRequest') {
          const newInfo = {
            count: NotificationsDataManager.followerRequestsInfo.count + 1,
            receivedFollowRequests: [
              {
                createdAt: data.notification.createdAt,
                id: data.notification.actionId,
                senderUser: data.notification.executorUser,
              },
              ...NotificationsDataManager.followerRequestsInfo
                .receivedFollowRequests,
            ],
          };
          NotificationsDataManager.followerRequestsInfo = newInfo;
        }
      }
    );

    const deletedNotificationSub = EventRegister.on(
      Events.DELETED_NOTIFICATION,
      async (data: DeletedNotificationEvent) => {
        const notificationsCopy = [...NotificationsDataManager.notifications];
        const index = notificationsCopy.findIndex(
          (item: UserNotification) => item.id === data.id && !item.softDeleted
        );
        if (index > -1) {
          notificationsCopy.splice(index, 1);
        }

        NotificationsDataManager.notifications = notificationsCopy;

        const followerRequestsInfoCopy = {
          ...NotificationsDataManager.followerRequestsInfo,
        };
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
      }
    );

    return () => {
      EventRegister.rm(postUploadedSub as string);
      EventRegister.rm(newNotificationSub as string);
      EventRegister.rm(deletedNotificationSub as string);
    };
  }, [feed]);

  useEffect(() => {
    NotificationsDataManager.fetchNotifications();
    NotificationsDataManager.getUnseenNotificationsCount();
    ChatsDataManager.fetchChats();
  }, []);

  const getFeed = useCallback(async () => {
    try {
      const response = await UserFeedApi.getUserFeedTimeline(
        'd740a9c4-dfc1-4dcb-89d5-34bf8311b5e2',
        10
      );
      setFeed(response);
    } catch (e) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  const renderItem: ListRenderItem<NormalPost> = useCallback(({ item }) => {
    return (
      <NormalPostItem
        key={item.id}
        onChangeScroll={setScrollable}
        post={item}
      />
    );
  }, []);

  const keyExtractor = (item: NormalPost, index: number) =>
    `${item.id}${index}`;

  const renderRightHeader = (
    <View flexDirection='row' alignItems='center' gap='m'>
      <HomeNotificationsButton />
      <HomeMessagesButton />
    </View>
  );
  return (
    <CollapsibleHeaderFlashList
      ListHeaderComponent={<PostUploadingTemplate />}
      data={feed}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      scrollEnabled={scrollable}
      estimatedItemSize={200}
      title='Reamine'
      rightHeader={renderRightHeader}
    />
  );
};
