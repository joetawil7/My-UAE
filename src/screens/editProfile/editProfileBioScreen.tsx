import { ScreenShell, Text, TouchableOpacity, View } from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { useNavigation } from '@navigation/navigationElements';
import React, { useState } from 'react';
import { KeyboardAccessory } from '@components/keyboardAccessory';
import { useTranslate } from '@localization';
import { AccountApi, useAuthentication } from '@services';
import { UserInfo } from '@types';
import { stylesConstants } from '@styles';
import { EditProfileTextInput } from './components/editProfileTextInput';

export const EditProfileBioScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
  const [bio, setBio] = useState(authenticatedUser?.bio ?? '');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const doneDisabled = bio.length === 0 || bio === authenticatedUser?.bio;

  const onDone = async () => {
    try {
      setLoading(true);
      await AccountApi.updateBio(bio);
      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          bio,
        };
        setAuthenticatedUser(modifiedUser);
      }
      navigation.goBack();
    } catch (e: any) {
      /* empty */
    }
    setLoading(false);
  };

  const onValueChange = (text: string) => {
    if (text.split(/\r\n|\r|\n/).length <= 6 && text.length <= 150) {
      setBio(text);
    }
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('bio')}
        rightHeader={
          <TouchableOpacity disabled={doneDisabled} onPress={onDone}>
            <Text color={doneDisabled ? 'grayDark' : 'primary'}>
              {t('done')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />
      <View flex={1}>
        <Text
          marginTop='xs'
          paddingLeft='m'
          variant={stylesConstants.SMALL_FONT}
          color='grayDark'
        >
          {t('bio')}
        </Text>

        <EditProfileTextInput
          value={bio}
          setValue={onValueChange}
          multiline
          autoHeight
          withoutCancel
          numberOfLines={6}
        />
      </View>
      <KeyboardAccessory>
        <Text marginLeft='auto' marginRight='m' marginBottom='m' color='gray'>
          {150 - bio.length}
        </Text>
      </KeyboardAccessory>
    </ScreenShell>
  );
};
