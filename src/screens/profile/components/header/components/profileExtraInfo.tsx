import { View, Image, Text } from '@components/base';
import { useTranslate } from '@localization';
import React from 'react';
import { I18nManager } from 'react-native';

export const ProfileExtraInfoRaw = () => {
  const { isRTL } = I18nManager;
  const { t } = useTranslate();
  const test = 3;

  return (
    <View flexDirection='row' justifyContent='space-between' marginBottom='m'>
      <View flexDirection='row' flex={1}>
        <Image
          source={require('@assets/img/gym.png')}
          width={16}
          height={16}
          marginRight='xs'
        />
        <Text variant='poppins_xs'>McFit Mannheim</Text>
      </View>
      <View flexDirection='row' flex={1}>
        <Image
          source={require('@assets/img/coach.png')}
          width={16}
          height={16}
          marginRight='xs'
        />
        <Text flexShrink={1}>
          <Text variant='poppins_xs'>George Tawil</Text>
          <Text variant='poppins_xs' color='grayDark'>
            {' '}
            {t('and').toLowerCase()}
          </Text>
          <Text variant='poppins_xs' color='grayDark'>
            {' '}
            {isRTL ? test.toLocaleString('ar') : test}
          </Text>
          <Text variant='poppins_xs' color='grayDark'>
            {' '}
            {t('others').toLowerCase()}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export const ProfileExtraInfo = React.memo(ProfileExtraInfoRaw);
