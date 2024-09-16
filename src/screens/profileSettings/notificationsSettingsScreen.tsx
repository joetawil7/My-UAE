import React, { useCallback } from 'react';
import {
  ScreenShell,
  View,
  Text,
  Switch,
  TouchableOpacity,
  Icon,
} from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { Translation, useTranslate } from '@localization';
import { NavigationHeader } from '@components/navigationHeader';
import { NotificationSettingApi } from '@services/api';
import { RequestQueue } from '@services';
import { useFetchNotificationsSettings } from '@components/hooks';

export const NotificationsSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.NotificationsSettingsScreen>
> = () => {
  const { settings, setSettings } = useFetchNotificationsSettings();

  const { t } = useTranslate();
  const navigation = useNavigation();

  const updateNotificationSettings = async (value: boolean) => {
    const oldActive = settings?.active;
    const newActive = value;

    try {
      setSettings((prev) => {
        return { ...prev, active: newActive };
      });
      await RequestQueue.executeInQueue('notificationSettings', '1', () =>
        NotificationSettingApi.updateNotificationSetting({
          active: newActive,
        })
      );
    } catch (e: any) {
      setSettings((prev) => {
        return { ...prev, active: oldActive };
      });
    }
  };

  const renderSwitchItem = (title: keyof Translation, enabled: boolean) => {
    return (
      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingVertical='s'
      >
        <Text variant='poppins_m_medium'>{t(title)}</Text>
        <Switch
          onValueChange={async (value) => {
            await updateNotificationSettings(value);
          }}
          value={enabled}
        />
      </View>
    );
  };

  const openScreen = useCallback(
    (screen: NavigationElement) => {
      navigation.push(screen as any, { settings });
    },
    [navigation, settings]
  );

  const renderItem = (
    title: keyof Translation,
    navigationElement: NavigationElement
  ) => {
    return (
      <TouchableOpacity
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingVertical='s'
        activeOpacity={0.6}
        onPress={() => openScreen(navigationElement)}
      >
        <Text color='white'>{t(title)}</Text>
        <Icon name='chevron-right' />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('notifications')} marginBottom='m' withBack />
      <View paddingHorizontal='m'>
        <Text marginBottom='s' variant='poppins_m_bold'>
          {t('push_notifications')}
        </Text>
        {renderSwitchItem('enable', settings?.active ?? false)}

        {renderItem(
          'following_and_followers',
          NavigationElement.NotificationFollowSettingsScreen
        )}

        {renderItem(
          'messages',
          NavigationElement.NotificationMessagesSettingsScreen
        )}

        {renderItem(
          'comments_and_likes',
          NavigationElement.NotificationCommentsLikesSettingsScreen
        )}

        {renderItem(
          'posts_and_mentions',
          NavigationElement.NotificationPostsMentionsSettingsScreen
        )}
      </View>
    </ScreenShell>
  );
};
