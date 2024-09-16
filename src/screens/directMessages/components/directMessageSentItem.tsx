import {
  Text,
  View,
  Image,
  SpringAnimatedView,
  TouchableOpacity,
  SpringAnimatedText,
} from '@components/base';
import { useSpring } from '@react-spring/native';
import { ChatMessage } from '@types';
import moment from 'moment';
import React, { useState } from 'react';

interface Props {
  message: ChatMessage;
}

const DirectMessageSentItemRaw = (props: Props) => {
  const { message } = props;

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
        alignSelf='flex-end'
        activeOpacity={0.9}
        onPress={() => setShowInfo((prev) => !prev)}
      >
        <View
          justifyContent='center'
          alignItems='center'
          backgroundColor='primary'
          borderRadius='m'
          overflow='hidden'
        >
          <View borderRadius='m' gap='m'>
            {message.text && (
              <Text
                marginHorizontal='s'
                marginTop='s'
                marginBottom={!message.media ? 's' : undefined}
                variant='poppins_s_medium'
                color='black'
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

      <SpringAnimatedView
        style={textContainerStyle}
        marginRight='xs'
        alignSelf='flex-end'
      >
        <SpringAnimatedText variant='poppins_xs' color='gray' style={textStyle}>
          {moment(message.createdAt).format('LT')}
        </SpringAnimatedText>
      </SpringAnimatedView>
    </SpringAnimatedView>
  );
};

export const DirectMessageSentItem = React.memo(DirectMessageSentItemRaw);
