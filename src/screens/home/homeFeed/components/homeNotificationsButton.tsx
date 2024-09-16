import { IconButton, View } from '@components/base';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { Events, NotificationsUnseenCountEvent } from '@types';
import React, { useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';

export const HomeNotificationsButton = () => {
  const navigation = useNavigation();

  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    const unseenNotificationsSub = EventRegister.on(
      Events.NOTIFICATIONS_UNSEEN_COUNT,
      (data: NotificationsUnseenCountEvent) => {
        setUnseenCount(data.count);
      }
    );

    const newNotificationSub = EventRegister.on(Events.NEW_NOTIFICATION, () => {
      setUnseenCount((prev) => (prev || 0) + 1);
    });

    return () => {
      EventRegister.rm(unseenNotificationsSub as any);
      EventRegister.rm(newNotificationSub as any);
    };
  }, []);

  return (
    <View>
      <IconButton
        name={unseenCount > 0 ? 'notification-filled' : 'notification'}
        size={28}
        onPress={() =>
          navigation.navigate(NavigationElement.NotificationsScreen)
        }
      />
      {unseenCount > 0 && (
        <View
          position='absolute'
          right={0}
          top={2}
          height={7}
          width={7}
          borderRadius='max'
          justifyContent='center'
          alignItems='center'
          backgroundColor='danger'
        />
      )}
    </View>
  );
};
