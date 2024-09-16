import { UserInfo } from '@types';
import React from 'react';
import { stylesConstants } from '@styles';
import { ProfilePicture } from '../profileInfo/profilePicture';
import { Username } from '../profileInfo/username';
import { View, Text, ViewProps } from '../base';

type Props = ViewProps & {
  userInfo: UserInfo;
  small?: boolean;
  rightElement?: JSX.Element;
  bottomElement?: JSX.Element;
  date?: string;
  size?: number;
};

const ProfileCardRaw = (props: Props) => {
  const { userInfo, small, rightElement, bottomElement, date, size } = props;

  return (
    <View
      flexDirection='row'
      alignItems='center'
      marginBottom='s'
      gap='xs'
      {...props}
    >
      <ProfilePicture user={userInfo} size={size ?? small ? 35 : 45} />

      <View flex={1}>
        {userInfo.username && (
          <View flexDirection='row' alignItems='center'>
            <Username
              user={userInfo}
              variant={small ? 'poppins_xs_medium' : 'poppins_m_medium'}
            />
            {date && (
              <Text marginLeft='2xs' variant='poppins_xs' color='gray'>
                {date}
              </Text>
            )}
          </View>
        )}
        {userInfo.name && (
          <Text variant={stylesConstants.SMALL_FONT} color='grayDark'>
            {userInfo.name}
          </Text>
        )}
        {bottomElement}
      </View>

      {rightElement}
    </View>
  );
};

export const ProfileCard = React.memo(ProfileCardRaw);
