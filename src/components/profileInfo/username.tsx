import React from 'react';
import { Text, TextProps } from '@components/base';
import { Theme } from '@theme/theme';
import { Events, UserInfo } from '@types';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { EventRegister } from 'react-native-event-listeners';

type Props = TextProps & {
  variant?: keyof Theme['textVariants'];
  user?: UserInfo;
  unClickable?: boolean;
};

const UsernameRaw = (props: Props) => {
  const { unClickable, variant, user } = props;

  const navigation = useNavigation();

  return (
    <Text
      onPress={() => {
        if (user && !unClickable) {
          EventRegister.emit(Events.CLOSE_ALL_BOTTOM_SHEETS);
          navigation.navigate(NavigationElement.UserProfileScreen, { user });
        }
      }}
      variant={variant ?? 'poppins_s_medium'}
      {...props}
    >
      {user?.username}
    </Text>
  );
};

export const Username = React.memo(UsernameRaw);
