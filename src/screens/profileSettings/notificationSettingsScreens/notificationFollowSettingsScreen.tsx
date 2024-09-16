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

export const NotificationFollowSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationFollowSettingsScreen>
> = ({ route }) => {
  const { settings } = route.params;

  const [newFollowers, setNewFollowers] = useState(
    settings.follows ? (settings.follows === 'On' ? '1' : '0') : '0'
  );

  const { t } = useTranslate();

  const updateNewFollowers = async (id: string) => {
    const old = newFollowers;

    try {
      setNewFollowers(id);
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          follows: id === '1' ? 'On' : 'Off',
        })
      );

      EventRegister.emit(Events.REFRESH_NOTIFICATIONS_SETTINGS);
    } catch (e: any) {
      setNewFollowers(old);
    }
  };

  const renderSeparator = (
    <View height={30} justifyContent='center' alignItems='center'>
      <View height={2} width='100%' backgroundColor='secondary' />
    </View>
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('following_and_followers')} withBack />
      <ScrollView paddingHorizontal='m' paddingTop='m'>
        <SettingsRadioItem
          radioButtons={defaultRadioOptions}
          setSelectedId={updateNewFollowers}
          selectedId={newFollowers}
          header='new_followers'
          footer='new_followers_notification_example'
        />
        {renderSeparator}
      </ScrollView>
    </ScreenShell>
  );
};
