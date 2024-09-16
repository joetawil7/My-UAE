import React, { useState } from 'react';
import { ScreenShell, View, ScrollView } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { NavigationHeader } from '@components/navigationHeader';
import { Events, privacyRadioOptions } from '@types';
import { NotificationSettingApi, RequestQueue } from '@services';
import { EventRegister } from 'react-native-event-listeners';
import { SettingsRadioItem } from '../components/settingsRadioItem';

export const NotificationCommentsLikesSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationCommentsLikesSettingsScreen>
> = ({ route }) => {
  const { settings } = route.params;

  const [newComments, setNewComments] = useState(
    settings.comments ? (settings.comments === 'Everyone' ? '1' : '0') : '0'
  );
  const [newLikes, setNewLikes] = useState(
    settings.likes ? (settings.likes === 'Everyone' ? '1' : '0') : '0'
  );

  const { t } = useTranslate();

  const updateNewComments = async (id: string) => {
    const old = newComments;

    try {
      setNewComments(id);
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          comments: id === '1' ? 'Everyone' : 'PeopleIFollow',
        })
      );

      EventRegister.emit(Events.REFRESH_NOTIFICATIONS_SETTINGS);
    } catch (e: any) {
      setNewComments(old);
    }
  };

  const updateNewLikes = async (id: string) => {
    const old = newLikes;

    try {
      setNewLikes(id);
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          likes: id === '1' ? 'Everyone' : 'PeopleIFollow',
        })
      );

      EventRegister.emit(Events.REFRESH_NOTIFICATIONS_SETTINGS);
    } catch (e: any) {
      setNewLikes(old);
    }
  };

  const renderSeparator = (
    <View height={30} justifyContent='center' alignItems='center'>
      <View height={2} width='100%' backgroundColor='secondary' />
    </View>
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('comments_and_likes')} withBack />
      <ScrollView paddingHorizontal='m' paddingTop='m'>
        <SettingsRadioItem
          radioButtons={privacyRadioOptions}
          setSelectedId={updateNewComments}
          selectedId={newComments}
          header='new_comments'
          footer='new_comments_notification_example'
        />
        {renderSeparator}
        <SettingsRadioItem
          radioButtons={privacyRadioOptions}
          setSelectedId={updateNewLikes}
          selectedId={newLikes}
          header='new_likes'
          footer='new_likes_notification_example'
        />
      </ScrollView>
    </ScreenShell>
  );
};
