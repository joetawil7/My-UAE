import { ScreenShell, Text, TouchableOpacity } from '@components/base';
import { NavigationHeader } from '@components/navigationHeader';
import { useNavigation } from '@navigation/navigationElements';
import React, { useState } from 'react';
import { AccountApi } from '@services/api';
import { UserInfo } from '@types';
import { useAuthentication } from '@services';
import { useTranslate } from '@localization';
import { stylesConstants } from '@styles';
import { EditProfileTextInput } from './components/editProfileTextInput';

export const EditProfileNameScreen = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [name, setName] = useState(authenticatedUser?.name ?? '');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslate();
  const navigation = useNavigation();

  const doneDisabled = name.length === 0 || name === authenticatedUser?.name;

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
        title={t('name')}
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
        {t('name')}
      </Text>

      <EditProfileTextInput value={name} setValue={validateName} />
    </ScreenShell>
  );
};
