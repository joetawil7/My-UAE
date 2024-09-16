import React, { useCallback } from 'react';
import {
  Icon,
  ScreenShell,
  TouchableOpacity,
  View,
  Text,
} from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { useTranslate } from '@localization';
import { ICON_SIZE, IconsId } from '@assets';
import { NavigationHeader } from '@components/navigationHeader';

export const ProfileSettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.ProfileSettingsScreen>
> = () => {
  const { t } = useTranslate();

  const navigation = useNavigation();

  const openScreen = useCallback(
    (screen: NavigationElement) => {
      navigation.push(screen as any);
    },
    [navigation]
  );

  const renderItem = useCallback(
    (title: string, icon: IconsId, screen: NavigationElement) => {
      return (
        <TouchableOpacity onPress={() => openScreen(screen)}>
          <View padding='m' flexDirection='row' alignItems='center' gap='m'>
            <Icon name={icon} size={ICON_SIZE.xl} />
            <Text>{title}</Text>
            <Icon name='chevron-right' marginLeft='auto' />
          </View>
        </TouchableOpacity>
      );
    },
    [openScreen]
  );

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('settings')} withBack />
      {renderItem(
        t('notifications'),
        'notification',
        NavigationElement.NotificationsSettingsScreen
      )}
      {renderItem(
        t('privacy'),
        'lock',
        NavigationElement.PrivacySettingsScreen
      )}
      {renderItem(
        t('blocked'),
        'blocked',
        NavigationElement.BlockedUsersScreen
      )}
      {renderItem(t('about'), 'information', NavigationElement.BookmarksScreen)}
    </ScreenShell>
  );
};
