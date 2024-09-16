import {
  Image,
  Pressable,
  ScreenShell,
  Text,
  TouchableOpacity,
  View,
} from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { Translation, useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { useAuthentication } from '@services/authentication';
import { useShopifyTheme } from '@theme/theme';
import moment from 'moment';
import React from 'react';

export const EditProfileScreen = () => {
  const { authenticatedUser } = useAuthentication();
  const date = moment(authenticatedUser?.birthDate).format('DD/MM/YYYY');

  const { t } = useTranslate();
  const theme = useShopifyTheme();
  const navigation = useNavigation();

  const renderProfilePictureEdit = (
    <TouchableOpacity
      alignItems='center'
      borderBottomColor='secondary'
      borderBottomWidth={1}
      paddingVertical='s'
      onPress={() => {
        navigation.push(NavigationElement.EditProfilePictureScreen);
      }}
    >
      <Image
        height={80}
        width={80}
        borderRadius='max'
        source={
          authenticatedUser?.profilePicture?.url
            ? { uri: authenticatedUser?.profilePicture.url }
            : require('@assets/img/defaultProfile.png')
        }
      />
      <Text marginTop='xs' variant='poppins_s_medium' color='primary'>
        {t('edit_picture')}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = (
    title: keyof Translation,
    value: string,
    onPress: () => void
  ) => (
    <Pressable
      style={({ pressed }) =>
        pressed ? { backgroundColor: theme.colors.secondary } : undefined
      }
      flexDirection='row'
      alignItems='center'
      paddingHorizontal='m'
      onPress={onPress}
    >
      <Text width={100} variant='poppins_m_medium'>
        {t(title)}
      </Text>
      <View
        flexGrow={1}
        borderBottomColor='secondary'
        borderBottomWidth={1}
        paddingVertical='s'
        flexShrink={1}
      >
        <Text numberOfLines={1}>{value}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenShell>
      <NavigationHeader withBack title={t('edit_profile')} />

      {renderProfilePictureEdit}

      {renderItem('name', authenticatedUser?.name ?? 'unauthorized', () => {
        if (authenticatedUser?.name) {
          navigation.push(NavigationElement.EditProfileNameScreen);
        }
      })}
      {renderItem(
        'username',
        authenticatedUser?.username ?? 'unauthorized',
        () => {
          if (authenticatedUser?.username) {
            navigation.push(NavigationElement.EditProfileUsernameScreen);
          }
        }
      )}
      {renderItem('birth_date', date, () => {
        navigation.push(NavigationElement.EditProfileBirthDateScreen);
      })}
      {renderItem('gender', authenticatedUser?.gender ?? 'unauthorized', () => {
        navigation.push(NavigationElement.EditProfileGenderScreen);
      })}
      {renderItem('bio', authenticatedUser?.bio ?? '', () => {
        navigation.push(NavigationElement.EditProfileBioScreen);
      })}
    </ScreenShell>
  );
};
