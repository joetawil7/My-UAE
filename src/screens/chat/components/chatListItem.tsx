import { TouchableOpacity, View, Text } from '@components/base';
import { ProfilePicture } from '@components/profileInfo';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { Chat, Events, TypingMessageEvent } from '@types';
import { dateHelpers } from '@utils/dateHelpers';
import React, { useEffect, useRef, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

interface Props {
  chat: Chat;
}

const ChatListItemRaw = (props: Props) => {
  const { chat } = props;

  const [isTyping, setIsTyping] = useState(false);
  const timeout = useRef<number | undefined>();

  const navigation = useNavigation();

  useEffect(() => {
    const typingMessageSub = EventRegister.on(
      Events.TYPING_MESSAGE,
      (data: TypingMessageEvent) => {
        if (data.userId === chat.user.id) {
          setIsTyping(true);
          clearTimeout(timeout.current);
          timeout.current = window.setTimeout(() => {
            setIsTyping(false);
          }, 1000);
        }
      }
    );

    return () => {
      EventRegister.rm(typingMessageSub as string);
    };
  }, [chat.user.id]);

  return (
    <TouchableOpacity
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      paddingHorizontal='m'
      paddingVertical='s'
      onPress={() =>
        navigation.push(NavigationElement.DirectMessagesScreen, {
          user: chat.user,
        })
      }
    >
      <View flexDirection='row' alignItems='center' gap='s'>
        <ProfilePicture user={chat.user} size={50} />
        <View>
          <Text variant='poppins_m_medium'>{chat.user.name}</Text>
          <Text variant='poppins_s' color={isTyping ? 'gray' : 'white'}>
            {isTyping
              ? 'is typing...'
              : chat.messages[0].text?.slice(0, 15).replace(/\s+/g, ' ')}
          </Text>
        </View>
      </View>
      <Text variant='poppins_xs' color='gray'>
        {dateHelpers.calculateDateDifference(
          new Date(chat.messages[0].createdAt)
        )}
      </Text>
    </TouchableOpacity>
  );
};

export const ChatListItem = React.memo(ChatListItemRaw);
