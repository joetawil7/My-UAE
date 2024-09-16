import { BirthDateInput, NavigationHeader } from '@components';
import { ScreenShell, TouchableOpacity, Text, View } from '@components/base';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { AccountApi, useAuthentication } from '@services';
import { UserInfo } from '@types';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

export const CreateAccountBirthDateScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [birthDate, setBirthDate] = useState(
    authenticatedUser?.birthDate ?? ''
  );
  const [dateValid, setDateValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const ref = useRef<TextInput>(null);
  const nextDisabled = !dateValid || birthDate.length === 0;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onDone = async () => {
    if (birthDate === authenticatedUser?.birthDate) {
      navigation.push(NavigationElement.CreateAccountGenderScreen);
      return;
    }

    try {
      setLoading(true);

      await AccountApi.updateBirthDate(birthDate);

      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          birthDate,
        };

        setAuthenticatedUser(modifiedUser);
      }
      navigation.push(NavigationElement.CreateAccountGenderScreen);
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('birth_date')}
        rightHeader={
          <TouchableOpacity disabled={nextDisabled} onPress={onDone}>
            <Text color={nextDisabled ? 'grayDark' : 'primary'}>
              {t('next')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <View paddingHorizontal='m' paddingTop='xl'>
        <BirthDateInput
          setBirthDate={setBirthDate}
          setDateValid={setDateValid}
          onError={!dateValid}
          ref={ref}
        />
      </View>
    </ScreenShell>
  );
};
