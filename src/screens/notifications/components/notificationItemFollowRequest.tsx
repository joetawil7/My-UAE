import { Events, UserNotification } from '@types';
import React, { useState } from 'react';
import { IconButton, Text, View } from '@components/base';
import { useTranslate } from '@localization';
import { dateHelpers } from '@utils';
import { RequestQueue } from '@services/requestQueue';
import { UserFollowRequestAPi } from '@services/api';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { EventRegister } from 'react-native-event-listeners';
import { NotificationBaseItem } from './notificationItemBase';

interface Props {
  notification: UserNotification;
  lastSeenDate?: string;
}

const NotificationItemFollowRequestRaw = (props: Props) => {
  const { notification, lastSeenDate } = props;

  const isUnseen = lastSeenDate
    ? new Date(notification.createdAt) > new Date(lastSeenDate)
    : false;

  const [accepted, setAccepted] = useState(false);
  const [responseMade, setResponseMade] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const onAccept = async () => {
    setAccepted(true);
    setResponseMade(true);
    try {
      notification.softDeleted = true;
      await RequestQueue.executeInQueue(
        'userFollowRequest',
        notification.executorUser.id,
        () =>
          UserFollowRequestAPi.acceptFollowRequest(notification.executorUser.id)
      );
      EventRegister.emit(Events.NOTIFICATIONS_FOLLOW_REQUEST_ACTION, {
        id: notification.actionId,
      });
    } catch (e: any) {
      setAccepted(false);
      setResponseMade(false);
      notification.softDeleted = false;
    }
  };

  const onDecline = async () => {
    setAccepted(false);
    setResponseMade(true);
    try {
      notification.softDeleted = true;
      await RequestQueue.executeInQueue(
        'userFollowRequest',
        notification.executorUser.id,
        () =>
          UserFollowRequestAPi.declineFollowRequest(
            notification.executorUser.id
          )
      );
      EventRegister.emit(Events.NOTIFICATIONS_FOLLOW_REQUEST_ACTION, {
        id: notification.actionId,
      });
    } catch (e: any) {
      setResponseMade(false);
      notification.softDeleted = false;
    }
  };

  const renderCenter = responseMade ? (
    <Text variant='poppins_s'>
      {accepted
        ? t('follow_request_accept_notification')
        : t('follow_request_decline_notification')}{' '}
      <Text variant='poppins_s_medium'>
        {notification.executorUser.username}
        &apos;s{' '}
      </Text>
      {t('follow_request').toLowerCase()}.
      <Text variant='poppins_s' color='gray'>
        {' '}
        {dateHelpers.calculateDateDifference(new Date(notification.createdAt))}
      </Text>
    </Text>
  ) : (
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
      {t('follow_request_notification')}
      <Text variant='poppins_s' color='gray'>
        {' '}
        {dateHelpers.calculateDateDifference(new Date(notification.createdAt))}
      </Text>
    </Text>
  );

  const renderRight = responseMade ? (
    <View />
  ) : (
    <View flexDirection='row' alignItems='center' gap='s'>
      <IconButton
        name='check-mark'
        circle
        backgroundColor='secondary'
        color='primary'
        onPress={onAccept}
      />

      <IconButton
        name='x'
        circle
        backgroundColor='secondary'
        color='danger'
        onPress={onDecline}
      />
    </View>
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

export const NotificationItemFollowRequest = React.memo(
  NotificationItemFollowRequestRaw
);
