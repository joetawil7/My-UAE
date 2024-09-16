import React, { useState } from 'react';
import { ScreenShell, View, ScrollView } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { NavigationHeader } from '@components/navigationHeader';
import { Events, defaultRadioOptions } from '@types';
import { NotificationSettingApi, RequestQueue } from '@services';
import { EventRegister } from 'react-native-event-listeners';
import { SettingsRadioItem } from '../components/settingsRadioItem';

export const NotificationMessagesSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationMessagesSettingsScreen>
> = ({ route }) => {
  const { settings } = route.params;

  const [newMessages, setNewMessages] = useState(
    settings.messages ? (settings.messages === 'On' ? '1' : '0') : '0'
  );

  const { t } = useTranslate();

  const updateNewMessages = async (id: string) => {
    const old = newMessages;

    try {
      setNewMessages(id);
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          messages: id === '1' ? 'On' : 'Off',
        })
      );

      EventRegister.emit(Events.REFRESH_NOTIFICATIONS_SETTINGS);
    } catch (e: any) {
      setNewMessages(old);
    }
  };

  const renderSeparator = (
    <View height={30} justifyContent='center' alignItems='center'>
      <View height={2} width='100%' backgroundColor='secondary' />
    </View>
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('messages')} withBack />
      <ScrollView paddingHorizontal='m' paddingTop='m'>
        <SettingsRadioItem
          radioButtons={defaultRadioOptions}
          setSelectedId={updateNewMessages}
          selectedId={newMessages}
          header='new_messages'
          footer='new_messages_notification_example'
        />
        {renderSeparator}
      </ScrollView>
    </ScreenShell>
  );
};
