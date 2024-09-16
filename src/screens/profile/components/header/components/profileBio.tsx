/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Text } from '@components/base';
import { stylesConstants } from '@styles';
import { useTranslate } from '@localization';
import { I18nManager } from 'react-native';

const ProfileBioRaw = () => {
  const { t } = useTranslate();
  const { isRTL } = I18nManager;

  return (
    <Text marginBottom='m'>
      {isRTL && (
        <Text variant='poppins_s_medium' color='grayDark'>
          {t('read_more')}
        </Text>
      )}
      <Text variant={stylesConstants.SMALL_FONT} numberOfLines={2}>
        Camillo lives in Vancouver, British Columbia. When he's not spending his
        time
      </Text>
      {!isRTL && (
        <Text variant='poppins_s_medium' color='grayDark'>
          {t('read_more')}
        </Text>
      )}
    </Text>
  );
};

export const ProfileBio = React.memo(ProfileBioRaw);
