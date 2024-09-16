import { Icon, Text, TouchableOpacity, View } from '@components/base';
import { ProfilePicture } from '@components/profileInfo';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { FollowerRequestInfo } from '@types';
import React from 'react';

interface Props {
  info?: FollowerRequestInfo;
}

const NotificationFollowRequestsDisplayRaw = (props: Props) => {
  const { info } = props;

  const { t } = useTranslate();
  const navigation = useNavigation();

  return info && info.receivedFollowRequests.length >= 1 ? (
    <View>
      <TouchableOpacity
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        padding='m'
        onPress={() => navigation.push(NavigationElement.FollowRequestsScreen)}
      >
        <View flexDirection='row' alignItems='center' gap='s'>
          <ProfilePicture user={info.receivedFollowRequests[0].senderUser} />
          <View>
            <Text variant='poppins_s_medium'>{t('follow_request')}s</Text>
            <Text variant='poppins_xs'>
              {info.receivedFollowRequests[0].senderUser.username}{' '}
              {info.count > 1 ? `and ${info.count - 1} others` : ''}{' '}
            </Text>
          </View>
        </View>

        <Icon name='chevron-right' />
      </TouchableOpacity>
      <View height={1} backgroundColor='secondary' />
    </View>
  ) : (
    <View />
  );
};

export const NotificationFollowRequestsDisplay = React.memo(
  NotificationFollowRequestsDisplayRaw
);
