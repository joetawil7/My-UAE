import { UserNotification } from '@types';
import React from 'react';
import { Image, Text } from '@components/base';
import { useTranslate } from '@localization';
import { useAuthentication } from '@services/authentication';
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

const NotificationItemCommentRaw = (props: Props) => {
  const { notification, lastSeenDate } = props;

  const isUnseen = lastSeenDate
    ? new Date(notification.createdAt) > new Date(lastSeenDate)
    : false;

  const { t } = useTranslate();
  const { authenticatedUser } = useAuthentication();
  const navigation = useNavigation();

  const onNavigateToPost = () => {
    if (notification.post) {
      navigation.push(NavigationElement.PostScreen, {
        post: notification.post,
      });
    }
  };

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
      {t('comment_notification')}: &quot;
      {notification.comment?.content &&
      notification.comment?.content?.length > 9
        ? notification.comment?.content
        : `${notification.comment?.content.slice(0, 9)}..`}
      &quot;
      <Text variant='poppins_s' color='gray'>
        {' '}
        {dateHelpers.calculateDateDifference(new Date(notification.createdAt))}
      </Text>
    </Text>
  );

  const renderRight = (
    <Image
      height={35}
      width={35}
      source={
        notification.post?.media && notification.post?.media.length > 0
          ? { uri: notification.post?.media[0].url }
          : authenticatedUser?.profilePicture?.url
          ? { uri: authenticatedUser.profilePicture?.url }
          : require('@assets/img/defaultProfile.png')
      }
      borderRadius='s'
      backgroundColor='defaultPicture'
    />
  );

  return (
    <NotificationBaseItem
      centerElement={renderCenter}
      rightElement={renderRight}
      user={notification.executorUser}
      onOverallPress={onNavigateToPost}
      isUnseen={isUnseen}
    />
  );
};

export const NotificationItemComment = React.memo(NotificationItemCommentRaw);
