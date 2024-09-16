import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { StorageKeys } from '@globals/storageKeys';
import * as Notifications from 'expo-notifications';
import { NotificationPushTokenApi, SecureStore } from '@services';
import Constants from 'expo-constants';
import { NotificationsRequestModal } from './bottomSheets/notificationsRequestModal';
import { NotificationsReminderModal } from './bottomSheets/notificationsReminderModal';

export const NotificationsProvider = () => {
  const [isRequestVisible, setIsRequestVisible] = useState(false);
  const [isReminderVisible, setIsReminderVisible] = useState(false);

  const registerForPushNotificationsAsync = useCallback(async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const response = await Notifications.getPermissionsAsync();
      const { status, canAskAgain } = response;
      if (status !== 'granted') {
        if (!canAskAgain) {
          const notificationsPushReminded = await SecureStore.getItem(
            StorageKeys.NOTIFICATION_PUSH_REMINDED
          );
          if (!notificationsPushReminded) {
            setIsReminderVisible(true);
          }
        } else {
          setIsRequestVisible(true);
        }
      } else {
        const notificationsPushToken = await SecureStore.getItem(
          StorageKeys.NOTIFICATION_PUSH_TOKEN
        );
        if (!notificationsPushToken) {
          const token = (
            await Notifications.getExpoPushTokenAsync({
              projectId: Constants.expoConfig?.extra?.eas.projectId,
            })
          ).data;
          await NotificationPushTokenApi.sendPushToken(token as string);
          await SecureStore.setItem(
            StorageKeys.NOTIFICATION_PUSH_TOKEN,
            token as string
          );
        }
      }
    }
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [registerForPushNotificationsAsync]);

  return (
    <>
      <NotificationsRequestModal
        isVisible={isRequestVisible}
        setIsVisible={setIsRequestVisible}
      />
      <NotificationsReminderModal
        isVisible={isReminderVisible}
        setIsVisible={setIsReminderVisible}
      />
    </>
  );
};
