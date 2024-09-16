import { TouchableOpacity, View } from '@components/base';
import { ProfilePicture } from '@components/profileInfo';
import { UserInfo } from '@types';
import React from 'react';

interface Props {
  centerElement: JSX.Element;
  rightElement?: JSX.Element;
  user?: UserInfo;
  onOverallPress?: () => void;
  isUnseen?: boolean;
}

const NotificationBaseItemRaw = (props: Props) => {
  const {
    rightElement,
    centerElement,
    user,
    onOverallPress,
    isUnseen = true,
  } = props;

  return (
    <View
      flexDirection='row'
      alignItems='center'
      paddingHorizontal='m'
      paddingVertical='s'
      backgroundColor={isUnseen ? 'grayDarker' : 'background'}
    >
      <ProfilePicture user={user} />
      <TouchableOpacity
        onPress={onOverallPress}
        flexDirection='row'
        flexShrink={1}
        activeOpacity={onOverallPress ? 0.8 : 1}
      >
        <View marginLeft='s' flexDirection='row' flexShrink={1} flexGrow={1}>
          {centerElement}
        </View>
        <View marginLeft='m'>{rightElement}</View>
      </TouchableOpacity>
    </View>
  );
};

export const NotificationBaseItem = React.memo(NotificationBaseItemRaw);
