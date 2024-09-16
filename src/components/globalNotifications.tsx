import { atom, useAtom, useSetAtom } from 'jotai';
import React, { useEffect, useMemo, useState } from 'react';
import { Toast } from './base/toast';

const notificationAtom = atom<ToastProps | null>(null);

export const GlobalNotificationsProvider: React.FC = () => {
  // we store the last notification so it doesnt disappear before the fade out
  const [lastNotification, setLastNotification] = useState<
    ToastProps | undefined
  >();

  const [notification, setNotification] = useAtom(notificationAtom);

  useEffect(() => {
    if (notification) {
      setLastNotification(notification);

      const durationMs = NotificationDuration[notification.duration ?? 'm'];
      if (durationMs >= 0) {
        const timeout = setTimeout(() => {
          setNotification(null);
        }, durationMs);
        return () => clearTimeout(timeout);
      }
    }
    return undefined;
  }, [setNotification, notification]);

  return (
    <Toast {...(notification ?? lastNotification)} visible={!!notification} />
  );
};

const NotificationDuration = {
  max: -1,
  m: 3000,
};

export type ToastProps = {
  message: string;
  duration?: keyof typeof NotificationDuration;
  position?: 'top' | 'bottom' | 'aboveTabBar';
};

export type GlobalNotifications = {
  makeToast: (toastProps: ToastProps) => () => void;
};

export const useGlobalNotifications = (): GlobalNotifications => {
  const setNotification = useSetAtom(notificationAtom);
  return useMemo(() => {
    const makeToast = (toastProps: ToastProps) => {
      setNotification(toastProps);
      return () => {
        setNotification(null);
      };
    };
    return { makeToast };
  }, [setNotification]);
};
