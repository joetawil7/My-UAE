import { UserNotification } from '@types';
import React from 'react';
import { Text } from '@components/base';
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

const NotificationItemFollowRequestAcceptRaw = (props: Props) => {
  const { notification, lastSeenDate } = props;

  const isUnseen = lastSeenDate
    ? new Date(notification.createdAt) > new Date(lastSeenDate)
    : false;

  const { t } = useTranslate();
  const navigation = useNavigation();

  const navigateToUser = () => {
    navigation.push(NavigationElement.UserProfileScreen, {
      user: notification.executorUser,
    });
  };

  const renderCenter = (
    <Text variant='poppins_s'>
      <Text variant='poppins_s_medium' onPress={navigateToUser}>
        {notification.executorUser.username}{' '}
      </Text>
      {t('accepted_follow_request_notification')}
      <Text variant='poppins_s' color='gray'>
        {' '}
        {dateHelpers.calculateDateDifference(new Date(notification.createdAt))}
      </Text>
    </Text>
  );

  return (
    <NotificationBaseItem
      centerElement={renderCenter}
      user={notification.executorUser}
      onOverallPress={navigateToUser}
      isUnseen={isUnseen}
    />
  );
};

export const NotificationItemFollowAcceptRequest = React.memo(
  NotificationItemFollowRequestAcceptRaw
);
