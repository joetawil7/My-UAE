import React, { useCallback, useMemo } from 'react';
import { ScreenShell, ActivityIndicator, Text } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { NavigationHeader } from '@components/navigationHeader';
import { FlatList, RefreshControl } from 'react-native';
import { Chat } from '@types';
import { useTranslate } from '@localization';
import { useFetchChats } from '@components/hooks';
import { ChatListItem } from './components/chatListItem';

export const ChatScreen: React.FC<
  RootStackScreenProps<NavigationElement.ChatScreen>
> = () => {
  const {
    chats,
    isLoadMore,
    isLoading,
    onPullToRefresh,
    refreshing,
    loadMoreChats,
  } = useFetchChats();

  const { t } = useTranslate();

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: Chat }) => {
      return <ChatListItem chat={item} />;
    },
    []
  );

  const keyExtractor = (item: Chat) => `${item.user.id}`;

  const renderFooter = useMemo(
    () => (isLoadMore ? <ActivityIndicator marginBottom='s' /> : undefined),
    [isLoadMore]
  );

  const renderEmptyComponent = isLoading ? (
    <ActivityIndicator marginTop='m' />
  ) : (
    <Text textAlign='center'>{t('no_follower_requests')}</Text>
  );

  return (
    <ScreenShell withoutBottom>
      <NavigationHeader withBack title={t('chats')} />

      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreChats}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onPullToRefresh}
            tintColor='#fff'
          />
        }
      />
    </ScreenShell>
  );
};
