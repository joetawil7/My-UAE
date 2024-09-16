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

export const NotificationPostsMentionsSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationPostsMentionsSettingsScreen>
> = ({ route }) => {
  const { settings } = route.params;

  const [newMentions, setNewMentions] = useState(
    settings.messages ? (settings.mentions === 'Everyone' ? '1' : '0') : '0'
  );

  const { t } = useTranslate();

  const updateNewMentions = async (id: string) => {
    const old = newMentions;

    try {
      setNewMentions(id);
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          mentions: id === '1' ? 'Everyone' : 'PeopleIFollow',
        })
      );

      EventRegister.emit(Events.REFRESH_NOTIFICATIONS_SETTINGS);
    } catch (e: any) {
      setNewMentions(old);
    }
  };

  const renderSeparator = (
    <View height={30} justifyContent='center' alignItems='center'>
      <View height={2} width='100%' backgroundColor='secondary' />
    </View>
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('posts_and_mentions')} withBack />
      <ScrollView paddingHorizontal='m' paddingTop='m'>
        <SettingsRadioItem
          radioButtons={privacyRadioOptions}
          setSelectedId={updateNewMentions}
          selectedId={newMentions}
          header='new_mentions'
          footer='new_mentions_notification_example'
        />
        {renderSeparator}
      </ScrollView>
    </ScreenShell>
  );
};
