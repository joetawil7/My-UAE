import { Text, View } from '@components/base';
import { ProfilePicture } from '@components/profileInfo';
import { UserInfo } from '@types';
import React from 'react';

interface Props {
  user: UserInfo;
}

const DirectMessageUserTypingRaw = (props: Props) => {
  const { user } = props;

  return (
    <View flexDirection='row' alignItems='center' gap='s'>
      <ProfilePicture user={user} />
      <View
        width={50}
        height={35}
        backgroundColor='secondary'
        borderRadius='m'
        alignItems='center'
        justifyContent='center'
      >
        <Text>. . .</Text>
      </View>
    </View>
  );
};

export const DirectMessageUserTyping = React.memo(DirectMessageUserTypingRaw);
