import {
  ActivityIndicator,
  Icon,
  ScreenShell,
  Text,
  TouchableOpacity,
  View,
} from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { useNavigation } from '@navigation/navigationElements';
import React, { useCallback, useRef, useState } from 'react';
import { AccountApi, Api, useAuthentication } from '@services';
import { UserInfo } from '@types';
import { useTranslate } from '@localization';
import { stylesConstants } from '@styles';
import { EditProfileTextInput } from './components/editProfileTextInput';

export const EditProfileUsernameScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [username, setUsername] = useState(authenticatedUser?.username ?? '');
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();
  const searchTimeout = useRef<number | undefined>();

  const doneDisabled =
    usernameLoading ||
    usernameExists ||
    !usernameValid ||
    username.length === 0 ||
    username === authenticatedUser?.username;

  const validateUsername = async (value: string) => {
    if (searchTimeout.current != null) {
      clearTimeout(searchTimeout.current);
    }

    const lowerCaseValue = value.toLowerCase();
    setUsername(lowerCaseValue);

    if (lowerCaseValue === authenticatedUser?.username) {
      setUsernameLoading(false);
      return;
    }

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
      navigation.goBack();
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
              {t('done')}
            </Text>
          </TouchableOpacity>
        }
        rightLoading={loading}
      />

      <Text
        marginTop='xs'
        paddingLeft='m'
        variant={stylesConstants.SMALL_FONT}
        color='grayDark'
      >
        {t('username')}
      </Text>

      <View>
        <EditProfileTextInput
          value={username}
          setValue={validateUsername}
          withoutCancel
        />
        {username.length > 0 && (
          <View
            position='absolute'
            height='100%'
            right={16}
            alignItems='center'
            justifyContent='center'
          >
            {usernameLoading ? (
              <ActivityIndicator />
            ) : username ===
              authenticatedUser?.username ? undefined : usernameExists ||
              !usernameValid ? (
              <Icon name='x' color='danger' />
            ) : (
              <Icon name='check-mark' gradientVariant='primary' />
            )}
          </View>
        )}
      </View>
    </ScreenShell>
  );
};
