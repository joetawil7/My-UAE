import { UserNotification } from '@types';
import React from 'react';
import { Text } from '@components/base';
import { FollowButton } from '@components/customButton';
import { useTranslate } from '@localization';
import { dateHelpers } from '@utils';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { NotificationBaseItem } from './notificationItemBase';

interface Props {
  notification: UserNotification;
  lastSeenDate?: string;
}

const NotificationItemFollowRaw = (props: Props) => {
  const { notification, lastSeenDate } = props;

  const isUnseen = lastSeenDate
    ? new Date(notification.createdAt) > new Date(lastSeenDate)
    : false;

  const { t } = useTranslate();
  const navigation = useNavigation();

  const renderCenter = (
    <Text variant='poppins_s'>
      <Text
        variant='poppins_s_medium'
        onPress={() =>
          navigation.push(NavigationElement.UserProfileScreen, {
            user: notification.executorUser,
          })
        }
      >
        {notification.executorUser.username}{' '}
      </Text>
      {t('follow_notification')}
      <Text variant='poppins_s' color='gray'>
        {' '}
        {dateHelpers.calculateDateDifference(new Date(notification.createdAt))}
      </Text>
    </Text>
  );

  const renderRight = (
    <FollowButton
      followed={notification.executorUser.relationship?.isFollowed}
      userId={notification.executorUser.id}
    />
  );

  return (
    <NotificationBaseItem
      centerElement={renderCenter}
      rightElement={renderRight}
      user={notification.executorUser}
      isUnseen={isUnseen}
    />
  );
};

export const NotificationItemFollow = React.memo(NotificationItemFollowRaw);
