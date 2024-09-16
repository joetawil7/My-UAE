import { StorageKeys } from '@globals';
import { NotificationPushTokenApi, SecureStore } from '@services';
import React from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import Modal from 'react-native-modal';
import { ICON_SIZE } from '@assets';
import { useTranslate } from '@localization';
import { View, Text, Icon } from '../base';
import { WideButton } from '../customButton';

interface Props {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const NotificationsRequestModal = (props: Props) => {
  const { isVisible, setIsVisible } = props;

  const { t } = useTranslate();

  const onNotificationsOn = async () => {
    setIsVisible(false);
    if (Device.isDevice) {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      try {
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
      } catch (e: any) {
        /* empty */
      }
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection='up'
      animationIn='fadeIn'
      animationOut='fadeOut'
      animationInTiming={200}
      animationOutTiming={400}
      useNativeDriverForBackdrop
      onBackdropPress={onNotificationsOn}
      style={{
        alignItems: 'center',
      }}
    >
      <View
        padding='l'
        backgroundColor='secondary'
        width='85%'
        borderRadius='m'
        alignItems='center'
      >
        <Text textAlign='center' variant='poppins_l_bold' marginBottom='s'>
          {t('welcome_to_app')}
        </Text>

        <Icon name='notification' size={ICON_SIZE.xxl} />

        <Text textAlign='center' variant='poppins_m_medium' marginBottom='2xs'>
          {t('notifications_motivation')},
        </Text>
        <Text textAlign='center' variant='poppins_m_medium' marginBottom='l'>
          {t('enable_notifications')} {t('now').toLowerCase()}!
        </Text>

        <WideButton
          onPress={onNotificationsOn}
          backgroundColor='primary'
          height={40}
          label={t('enable_notifications')}
          width='100%'
          labelProps={{ variant: 'poppins_m_bold' }}
        />
      </View>
    </Modal>
  );
};
