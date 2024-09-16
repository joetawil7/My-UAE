import { View, Text, TouchableOpacity } from '@components/base';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { stylesConstants } from '@styles';
import { UserInfo } from '@types';
import React, { FC } from 'react';

interface Props {
  userInfo: UserInfo;
}

export const ProfileStatsBarRaw: FC<Props> = ({ userInfo }) => {
  const { t } = useTranslate();
  const navigation = useNavigation();

  const navigateToFollowStats = (_followers: boolean) => {
    navigation.push(NavigationElement.FollowStatsScreen, {
      username: userInfo.username,
      userId: userInfo.id,
      followers: _followers,
    });
  };

  const renderPosts = (
    <View alignItems='center'>
      <Text variant='poppins_m_medium'>{0}</Text>
      <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
        {t('posts')}
      </Text>
    </View>
  );

  const renderFollowers = (
    <TouchableOpacity
      alignItems='center'
      activeOpacity={1}
      onPress={() => navigateToFollowStats(true)}
    >
      <Text variant='poppins_m_medium'>{userInfo.stats?.followersCount}</Text>
      <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
        {t('followers')}
      </Text>
    </TouchableOpacity>
  );

  const renderFollowing = (
    <TouchableOpacity
      alignItems='center'
      activeOpacity={1}
      onPress={() => navigateToFollowStats(false)}
    >
      <Text variant='poppins_m_medium'>{userInfo.stats?.followingCount}</Text>
      <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
        {t('following')}
      </Text>
    </TouchableOpacity>
  );

  const renderIdol = (
    <View alignItems='center'>
      <Text variant='poppins_m_medium'>{230}</Text>
      <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
        {t('idol')}
      </Text>
    </View>
  );

  return (
    <View
      paddingHorizontal='4xl'
      paddingVertical='m'
      flexDirection='row'
      justifyContent='space-between'
      borderRadius='m'
      borderWidth={1}
      borderColor='secondary'
      marginBottom='m'
    >
      {renderPosts}
      {renderFollowers}
      {renderFollowing}
      {renderIdol}
    </View>
  );
};

export const ProfileStatsBar = React.memo(ProfileStatsBarRaw);
