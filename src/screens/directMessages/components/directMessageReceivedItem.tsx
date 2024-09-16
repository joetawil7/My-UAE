import {
  Image,
  SpringAnimatedText,
  SpringAnimatedView,
  Text,
  TouchableOpacity,
  View,
} from '@components/base';
import { ProfilePicture } from '@components/profileInfo';
import { useSpring } from '@react-spring/native';
import { ChatMessage, UserInfo } from '@types';
import moment from 'moment';
import React, { useState } from 'react';

interface Props {
  message: ChatMessage;
  user: UserInfo;
  grouped?: boolean;
}

const DirectMessageReceivedItemRaw = (props: Props) => {
  const { message, user, grouped } = props;

  const [showInfo, setShowInfo] = useState(false);

  const containerStyle = useSpring({
    from: {
      marginBottom: showInfo ? 12 : 18,
    },
    to: {
      marginBottom: showInfo ? 18 : 12,
    },
    config: {
      duration: 200,
    },
  });

  const textContainerStyle = useSpring({
    from: {
      opacity: showInfo ? 0 : 1,
      marginTop: showInfo ? 0 : 4,
    },
    to: {
      opacity: showInfo ? 1 : 0,
      marginTop: showInfo ? 4 : 0,
    },
    config: {
      duration: 150,
    },
  });

  const textStyle = useSpring({
    from: {
      fontSize: showInfo ? 1 : 12,
    },
    to: {
      fontSize: showInfo ? 12 : 1,
    },
    config: {
      duration: 150,
    },
  });

  return (
    <SpringAnimatedView marginBottom='s' style={containerStyle}>
      <TouchableOpacity
        flexDirection='row'
        gap='s'
        onPress={() => setShowInfo((prev) => !prev)}
        activeOpacity={0.9}
      >
        <View
          alignItems='flex-end'
          borderRadius='m'
          overflow='hidden'
          flexDirection='row'
          gap='s'
          marginLeft={grouped ? '3xl' : 'none'}
        >
          {!grouped && <ProfilePicture user={user} />}
          <View
            borderRadius='m'
            gap='m'
            backgroundColor='secondary'
            overflow='hidden'
          >
            {message.text && (
              <Text
                marginHorizontal='s'
                marginTop='s'
                marginBottom={!message.media ? 's' : undefined}
                variant='poppins_s_medium'
                color='white'
              >
                {message.text}
              </Text>
            )}
            {message.media && (
              <Image
                source={message.media.url}
                contentFit='cover'
                height={200}
                width={200}
                borderBottomLeftRadius='m'
                borderBottomRightRadius='m'
              />
            )}
          </View>
        </View>
      </TouchableOpacity>

      <SpringAnimatedView marginLeft='4xl' style={textContainerStyle}>
        <SpringAnimatedText variant='poppins_xs' color='gray' style={textStyle}>
          {moment(message.createdAt).format('LT')}
        </SpringAnimatedText>
      </SpringAnimatedView>
    </SpringAnimatedView>
  );
};

export const DirectMessageReceivedItem = React.memo(
  DirectMessageReceivedItemRaw
);
