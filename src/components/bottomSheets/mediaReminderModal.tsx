import React from 'react';
import Modal from 'react-native-modal';
import { ICON_SIZE } from '@assets';
import { Linking } from 'react-native';
import { useTranslate } from '@localization';
import { SecureStore } from '@services/index';
import { StorageKeys } from '@globals/storageKeys';
import { View, Text, Icon } from '../base';
import { WideButton } from '../customButton';

interface Props {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const MediaReminderModal = (props: Props) => {
  const { isVisible, setIsVisible } = props;

  const { t } = useTranslate();

  const clear = async () => {
    setIsVisible(false);
    await SecureStore.setItem(StorageKeys.MEDIA_PERMISSION_REMINDED, 'true');
  };

  const onNotificationsOn = async () => {
    await clear();
    Linking.openSettings();
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
      onBackdropPress={clear}
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
        <Text textAlign='center' variant='poppins_l_bold' marginBottom='xs'>
          {t('media_permission')}
        </Text>

        <Icon name='media' size={ICON_SIZE.xxl} marginBottom='xs' />

        <Text textAlign='center' variant='poppins_m' marginBottom='2xs'>
          {t('forgot_turn_media_on')}
        </Text>
        <Text textAlign='center' variant='poppins_m' marginBottom='l'>
          {t('turn_notifications_settings')}
        </Text>

        <WideButton
          onPress={onNotificationsOn}
          backgroundColor='primary'
          height={40}
          label={t('open_settings')}
          width='100%'
          labelProps={{ variant: 'poppins_m_medium' }}
        />
      </View>
    </Modal>
  );
};
