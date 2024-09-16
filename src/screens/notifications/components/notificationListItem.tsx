import { UserNotification } from '@types';
import React from 'react';
import { NotificationItemFollow } from './notificationItemFollow';
import { NotificationItemComment } from './notificationItemComment';
import { NotificationItemReply } from './notificationItemReply';
import { NotificationItemLike } from './notificationItemLike';
import { NotificationItemFollowRequest } from './notificationItemFollowRequest';
import { NotificationItemFollowAcceptRequest } from './notificationItemFollowRequestAccept';

interface Props {
  notification: UserNotification;
  lastSeenDate?: string;
}

const NotificationListItemRaw = (props: Props) => {
  const { notification, lastSeenDate } = props;

  const filterNotificationType = () => {
    switch (notification.type) {
      case 'Follow':
        return (
          <NotificationItemFollow
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
      case 'Comment':
        return (
          <NotificationItemComment
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
      case 'Reaction':
        return (
          <NotificationItemLike
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
      case 'SentFollowRequest':
        return (
          <NotificationItemFollowRequest
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
      case 'AcceptFollowRequest':
        return (
          <NotificationItemFollowAcceptRequest
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
      default:
        return (
          <NotificationItemReply
            notification={notification}
            lastSeenDate={lastSeenDate}
          />
        );
    }
  };

  return filterNotificationType();
};

export const NotificationListItem = React.memo(NotificationListItemRaw);
