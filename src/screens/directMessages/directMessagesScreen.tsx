/* eslint-disable react/no-unused-prop-types */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ScreenShell,
  ActivityIndicator,
  Text,
  View,
  IconButton,
  SpringAnimatedView,
} from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { NavigationHeader } from '@components/navigationHeader';
import { RefreshControl, SectionList, ViewToken } from 'react-native';
import {
  ChatMessage,
  Events,
  Media,
  MessagesSection,
  NextAppStateEvent,
  TypingMessageEvent,
} from '@types';
import { useTranslate } from '@localization';
import { useFetchDirectMessages } from '@components/hooks';
import { ChatTextInput, KeyboardAccessory, ProfileCard } from '@components';
import { ICON_SIZE } from '@assets';
import { ChevronLeft } from '@icons/rtl';
import { EventRegister } from 'react-native-event-listeners';
import { MessageApi } from '@services/api';
import { useSpring } from '@react-spring/native';
import { DirectMessageReceivedItem } from './components/directMessageReceivedItem';
import { DirectMessageSentItem } from './components/directMessageSentItem';
import { DirectMessageUserTyping } from './components/directMessageUserTyping';

export const DirectMessagesScreen: React.FC<
  RootStackScreenProps<NavigationElement.DirectMessagesScreen>
> = ({ route }) => {
  const { user } = route.params;
  const {
    directMessages,
    isLoadMore,
    isLoading,
    onPullToRefresh,
    refreshing,
    loadMoreDirectMessages,
    getDirectMessages,
    sendMessage,
  } = useFetchDirectMessages();

  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [media, setMedia] = useState<Media | undefined>();
  const [currentDate, setCurrentDate] = useState<string>();
  const [onScroll, setOnScroll] = useState(false);
  const opacity = useSpring({
    from: { opacity: onScroll ? 0 : 1 },
    to: { opacity: onScroll ? 1 : 0 },
    config: {
      duration: 150,
    },
  });

  const { t } = useTranslate();
  const navigation = useNavigation();

  const timeout = useRef<number | undefined>();

  const lastTypeTime = useRef<Date>();

  useEffect(() => {
    const typingMessageSub = EventRegister.on(
      Events.TYPING_MESSAGE,
      (data: TypingMessageEvent) => {
        if (data.userId === user.id) {
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
  }, [user.id]);

  useEffect(() => {
    getDirectMessages(user.id);
  }, [getDirectMessages, user.id]);

  const onSendMessage = async () => {
    setText('');
    setMedia(undefined);
    try {
      await sendMessage(user.id, text, media);
    } catch (e: any) {
      /* empty */
    }
  };

  useEffect(() => {
    const nextAppStateSub = EventRegister.on(
      Events.NEXT_APP_STATE,
      async (data: NextAppStateEvent) => {
        if (data.nextAppState === 'active') {
          await onPullToRefresh(user.id);
        }
      }
    );

    return () => {
      EventRegister.rm(nextAppStateSub as string);
    };
  }, [onPullToRefresh, user.id]);

  const renderItem = useCallback(
    ({
      item,
      section,
      index,
    }: {
      item: ChatMessage;
      section: any;
      index: number;
    }) => {
      const sectionIndex = [
        ...(directMessages.get(user.id) as MessagesSection[]),
      ]
        .reverse()
        .indexOf(section);
      return item.received ? (
        <DirectMessageReceivedItem
          message={item}
          user={user}
          grouped={
            index !== 0 &&
            [...(directMessages.get(user.id) as MessagesSection[])].reverse()[
              sectionIndex
            ].data[index - 1].received
          }
        />
      ) : (
        <DirectMessageSentItem message={item} />
      );
    },
    [directMessages, user]
  );

  const keyExtractor = (item: ChatMessage) => `${item.createdAt + item.id}`;

  const renderFooter = useMemo(
    () => (isLoadMore ? <ActivityIndicator marginBottom='s' /> : undefined),
    [isLoadMore]
  );

  const renderEmptyComponent = isLoading ? (
    <ActivityIndicator marginTop='m' />
  ) : (
    <Text textAlign='center'>{t('no_follower_requests')}</Text>
  );

  const renderLeftHeader = (
    <View flexDirection='row' alignItems='center' gap='m'>
      <IconButton
        size={ICON_SIZE.l}
        name={ChevronLeft}
        onPress={navigation.goBack}
      />
      <ProfileCard userInfo={user} size={25} marginBottom='none' />
    </View>
  );

  const onUserType = async (value: string) => {
    if (value.trim().length === 0) {
      setText('');
    } else {
      setText(value);
      const now = new Date();

      const moreThanSecond =
        !lastTypeTime.current ||
        (now.getTime() - lastTypeTime.current.getTime()) / 1000 >= 1;

      if (moreThanSecond) {
        lastTypeTime.current = now;
        await MessageApi.messageTyping(user.id);
      }
    }
  };

  const updateStickyDate = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (info.viewableItems && info.viewableItems.length) {
      const lastItem = info.viewableItems.pop();
      if (lastItem && lastItem.section) {
        setCurrentDate(lastItem.section.date);
      }
    }
  };

  const renderStickyDate = () => {
    return currentDate ? (
      <SpringAnimatedView
        position='absolute'
        top={125}
        alignSelf='center'
        paddingVertical='2xs'
        paddingHorizontal='s'
        borderRadius='m'
        zIndex='max'
        style={opacity}
      >
        <View
          left={0}
          right={0}
          top={0}
          bottom={0}
          position='absolute'
          backgroundColor='secondary'
          opacity={0.8}
          borderRadius='m'
        />
        <Text variant='poppins_xs_medium'>{currentDate}</Text>
      </SpringAnimatedView>
    ) : null;
  };

  return (
    <ScreenShell withoutBottom>
      <NavigationHeader paddingBottom='s' leftHeader={renderLeftHeader} />
      {renderStickyDate()}
      <SectionList
        sections={
          directMessages.has(user.id)
            ? (directMessages.get(user.id) as MessagesSection[])
            : []
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        ListHeaderComponent={
          isTyping ? <DirectMessageUserTyping user={user} /> : undefined
        }
        onEndReached={() => {
          loadMoreDirectMessages(user.id);
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onPullToRefresh(user.id)}
            tintColor='#fff'
          />
        }
        contentContainerStyle={{
          padding: 16,
        }}
        inverted
        onMomentumScrollBegin={() => setOnScroll(true)}
        onMomentumScrollEnd={() => setOnScroll(false)}
        onViewableItemsChanged={updateStickyDate}
      />

      <KeyboardAccessory>
        <View
          marginBottom='xl'
          paddingVertical='s'
          paddingHorizontal='m'
          zIndex='max'
          borderTopWidth={1}
          borderColor='secondary'
        >
          <ChatTextInput
            value={text}
            onValueChange={onUserType}
            onSubmit={onSendMessage}
            media={media}
            setMedia={setMedia}
          />
        </View>
      </KeyboardAccessory>
    </ScreenShell>
  );
};
