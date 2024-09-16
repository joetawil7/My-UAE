import { NavigationHeader, CustomTextInput } from '@components';
import {
  ScreenShell,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Icon,
} from '@components/base';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { AccountApi, Api, useAuthentication } from '@services';
import { UserInfo } from '@types';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInput } from 'react-native';

export const CreateAccountUsernameScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [username, setUsername] = useState(authenticatedUser?.username ?? '');
  const [loading, setLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const ref = useRef<TextInput>(null);
  const searchTimeout = useRef<number | undefined>();

  const doneDisabled =
    usernameLoading ||
    usernameExists ||
    !usernameValid ||
    username.length === 0;

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const validateUsername = async (value: string) => {
    if (searchTimeout.current != null) {
      clearTimeout(searchTimeout.current);
    }

    const lowerCaseValue = value.toLowerCase();
    setUsername(lowerCaseValue);

    const valid = /^[a-z][a-z0-9.]+[a-z0-9_]$/.test(value);
    setUsernameValid(valid);

    if (!valid) {
      setUsernameLoading(false);
      return;
    }

    if (!usernameLoading && username.length !== 0) {
      setUsernameLoading(true);
    }

    searchTimeout.current = window.setTimeout(async () => {
      try {
        const response = await Api.account.usernameExists(lowerCaseValue);
        if (response.exists) {
          setUsernameExists(true);
        } else {
          setUsernameExists(false);
        }
      } catch (e: unknown) {
        /* empty */
      }
      setUsernameLoading(false);
    }, 500);
  };

  const onDone = useCallback(async () => {
    if (username === authenticatedUser?.username) {
      navigation.push(NavigationElement.CreateAccountBirthDateScreen);
      return;
    }

    try {
      setLoading(true);

      await AccountApi.updateUsername(username);

      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          username,
        };

        setAuthenticatedUser(modifiedUser);
      }
      navigation.push(NavigationElement.CreateAccountBirthDateScreen);
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  }, [authenticatedUser, navigation, setAuthenticatedUser, username]);

  return (
    <ScreenShell>
      <NavigationHeader
        withBack
        title={t('username')}
        rightHeader={
          <TouchableOpacity disabled={doneDisabled} onPress={onDone}>
            <Text color={doneDisabled ? 'grayDark' : 'primary'}>
              {t('next')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <View paddingHorizontal='m' paddingTop='xl'>
        <View>
          <CustomTextInput
            value={username}
            onValueChange={validateUsername}
            placeholder={t('username')}
            keyboardType='default'
            ref={ref}
          />
          {username.length > 0 && (
            <View
              position='absolute'
              top={0}
              bottom={0}
              right={16}
              alignItems='center'
              justifyContent='center'
            >
              {usernameLoading ? (
                <ActivityIndicator />
              ) : usernameExists || !usernameValid ? (
                <Icon name='x' color='danger' />
              ) : (
                <Icon name='check-mark' gradientVariant='primary' />
              )}
            </View>
          )}
        </View>
      </View>
    </ScreenShell>
  );
};
