import { GoogleLocation, UserInfo } from '@types';
import React from 'react';
import { stylesConstants } from '@styles';
import { ProfilePicture } from '../profileInfo/profilePicture';
import { Username } from '../profileInfo/username';
import { View, Text } from '../base';

interface Props {
  userInfo: UserInfo;
  location?: GoogleLocation;
  time?: string;
}

const PostProfileCardRaw = (props: Props) => {
  const { userInfo, location, time } = props;

  return (
    <View flexDirection='row' alignItems='center'>
      <ProfilePicture marginRight='xs' user={userInfo} />

      <View justifyContent='space-between' gap='2xs'>
        <View flexDirection='row' alignItems='center'>
          <Username user={userInfo} />
          {time && (
            <Text variant='poppins_xs' color='gray' marginLeft='2xs'>
              {time}
            </Text>
          )}
        </View>
        {location && (
          <Text
            variant={stylesConstants.SMALL_FONT}
            color='primary'
            marginRight='2xs'
          >
            {location.description}
          </Text>
        )}
      </View>
    </View>
  );
};

export const PostProfileCard = React.memo(PostProfileCardRaw);
