import { Globals } from '@globals/globals';
import { CacheManager, NotificationSettingApi } from '@services';
import { Events, NotificationSettingType } from '@types';
import { useCallback, useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export const useFetchNotificationsSettings = () => {
  const [settings, setSettings] = useState<NotificationSettingType | undefined>(
    CacheManager.notificationsSettings.get(Globals.userId)
  );

  const getNotificationsSettings = useCallback(async () => {
    try {
      const response = await NotificationSettingApi.getNotificationSetting();
      setSettings(response);
    } catch (e: any) {
      /* empty */
    }
  }, []);

  useEffect(() => {
    getNotificationsSettings();
  }, [getNotificationsSettings]);

  useEffect(() => {
    CacheManager.notificationsSettings.set(Globals.userId, settings);
  }, [settings]);

  useEffect(() => {
    const refreshSettingsSub = EventRegister.addEventListener(
      Events.REFRESH_NOTIFICATIONS_SETTINGS,
      async () => {
        await getNotificationsSettings();
      }
    );

    return () => {
      EventRegister.rm(refreshSettingsSub as any);
    };
  }, [getNotificationsSettings]);

  return {
    settings,
    setSettings,
  };
};
