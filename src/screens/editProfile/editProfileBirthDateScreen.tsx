import { ScreenShell, Text, TouchableOpacity, View } from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { useNavigation } from '@navigation/navigationElements';
import React, { useEffect, useRef, useState } from 'react';
import { AccountApi } from '@services/api';
import { UserInfo } from '@types';
import { useAuthentication } from '@services';
import { useTranslate } from '@localization';
import { BirthDateInput } from '@components';
import { TextInput } from 'react-native';
import moment from 'moment';

export const EditProfileBirthDateScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();
  const date = moment(authenticatedUser?.birthDate).format('DD/MM/YYYY');

  const [birthDate, setBirthDate] = useState(
    authenticatedUser?.birthDate ?? ''
  );
  const [loading, setLoading] = useState(false);
  const [dateValid, setDateValid] = useState(true);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const ref = useRef<TextInput>(null);
  const doneDisabled = !dateValid || birthDate.length === 0;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onDone = async () => {
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

      navigation.goBack();
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('gender')}
        rightHeader={
          <TouchableOpacity disabled={doneDisabled} onPress={onDone}>
            <Text color={doneDisabled ? 'grayDark' : 'primary'}>
              {t('done')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <View paddingHorizontal='m' paddingTop='xl'>
        <BirthDateInput
          initialDate={date}
          setBirthDate={setBirthDate}
          setDateValid={setDateValid}
          onError={!dateValid}
          ref={ref}
        />
      </View>
    </ScreenShell>
  );
};
