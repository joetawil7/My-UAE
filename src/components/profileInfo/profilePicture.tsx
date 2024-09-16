import React from 'react';
import { Image, ImageProps, TouchableOpacity } from '@components/base';
import { Events, UserInfo } from '@types';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { EventRegister } from 'react-native-event-listeners';

type Props = ImageProps & {
  size?: number;
  user?: UserInfo;
  unClickable?: boolean;
};

const ProfilePictureRaw = (props: Props) => {
  const { size, user, unClickable } = props;

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={user ? 0.8 : 1}
      onPress={() => {
        if (user && !unClickable) {
          EventRegister.emit(Events.CLOSE_ALL_BOTTOM_SHEETS);
          navigation.navigate(NavigationElement.UserProfileScreen, { user });
        }
      }}
    >
      <Image
        borderRadius='max'
        height={size ?? 35}
        width={size ?? 35}
        source={
          user?.profilePicture?.url
            ? { uri: user?.profilePicture?.url }
            : require('@assets/img/defaultProfile.png')
        }
        {...props}
      />
    </TouchableOpacity>
  );
};

export const ProfilePicture = React.memo(ProfilePictureRaw);
