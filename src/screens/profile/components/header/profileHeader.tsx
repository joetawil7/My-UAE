import { View, Text, Icon } from '@components/base';
import React from 'react';
import { stylesConstants } from '@styles';
import { RatingStarsDisplay } from '@components';
import { UserInfo } from '@types';
import {
  ProfileActionsBar,
  ProfileBio,
  ProfileExtraInfo,
  ProfileFollowers,
  ProfileStatsBar,
} from './components';

interface Props {
  userInfo: UserInfo;
}

export const ProfileHeaderRaw = (props: Props) => {
  const { userInfo } = props;

  return (
    <View zIndex='max'>
      <View
        backgroundColor='background'
        flex={1}
        style={{ marginTop: -35 }}
        borderTopLeftRadius='l'
        borderTopRightRadius='l'
        paddingHorizontal='m'
      >
        <ProfileActionsBar userInfo={userInfo} />

        <View marginBottom='2xs'>
          <View
            flexDirection='row'
            justifyContent='space-between'
            alignItems='flex-end'
          >
            <View flexDirection='row'>
              <Text variant='poppins_m_medium'>{userInfo.name}</Text>
              <Icon name='verified' color='primary' marginLeft='2xs' />
            </View>

            <ProfileFollowers />
          </View>
          <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
            @{userInfo.username}
          </Text>
        </View>

        <RatingStarsDisplay stars={3.5} count={172} withNavigate />

        <ProfileBio />

        <ProfileStatsBar userInfo={userInfo} />

        <ProfileExtraInfo />
      </View>
    </View>
  );
};

export const ProfileHeader = React.memo(ProfileHeaderRaw);
