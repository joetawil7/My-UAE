import { View, Image, Text } from '@components/base';
import { useTranslate } from '@localization';
import React from 'react';

// interface Props {
//     test: string;
// }

export const ProfileFollowersRaw = () => {
  const { t } = useTranslate();

  return (
    <View flexDirection='row'>
      <Text variant='poppins_xs' color='gray' marginRight='2xs'>
        {t('followed_by')}
      </Text>
      <View width={70}>
        <Image
          source={require('@assets/img/profile.png')}
          position='absolute'
          top={-5}
          width={25}
          height={25}
        />
        <Image
          source={require('@assets/img/profile.png')}
          position='absolute'
          top={-5}
          width={25}
          height={25}
          left={15}
        />
        <Image
          source={require('@assets/img/profile.png')}
          position='absolute'
          top={-5}
          width={25}
          height={25}
          left={30}
        />
        <View
          position='absolute'
          top={-5}
          width={25}
          height={25}
          left={45}
          alignItems='center'
          justifyContent='center'
          borderRadius='max'
          backgroundColor='secondary'
        >
          <Text variant='poppins_xxs'>+1k</Text>
        </View>
      </View>
    </View>
  );
};

export const ProfileFollowers = React.memo(ProfileFollowersRaw);
