import { NavigationHeader, CustomTextInput } from '@components';
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

export const CreateAccountNameScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [name, setName] = useState(authenticatedUser?.name ?? '');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const ref = useRef<TextInput>(null);

  const nextDisabled = name.length === 0;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const validateName = (_value: string) => {
    let value = _value;
    const valid =
      value.length > 0 && /^[a-z]*(\s[a-z]*)?$/.test(value.toLocaleLowerCase());

    if (valid) {
      setName(value);
      return;
    }

    value = value.slice(0, -1);
    setName(value);
  };

  const onDone = async () => {
    if (name === authenticatedUser?.name) {
      navigation.push(NavigationElement.CreateAccountUsernameScreen);
      return;
    }

    try {
      setLoading(true);

      await AccountApi.updateName(name);

      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          name,
        };

        setAuthenticatedUser(modifiedUser);
      }
      navigation.push(NavigationElement.CreateAccountUsernameScreen);
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('name')}
        rightHeader={
          <TouchableOpacity disabled={nextDisabled} onPress={onDone}>
            <Text color={nextDisabled ? 'grayDark' : 'primary'}>
              {t('next')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <View paddingHorizontal='m'>
        <CustomTextInput
          marginTop='xl'
          value={name}
          onValueChange={validateName}
          placeholder={t('name')}
          keyboardType='default'
          ref={ref}
        />
      </View>
    </ScreenShell>
  );
};
