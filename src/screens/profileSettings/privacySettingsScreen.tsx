import React, { useState } from 'react';
import { ScreenShell, View, Text, Switch } from '@components/base';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { Translation, useTranslate } from '@localization';
import { NavigationHeader } from '@components/navigationHeader';
import { AccountApi } from '@services/api';
import { useAuthentication } from '@services';
import { UserInfo } from '@types';

export const PrivacySettingsScreen: React.FC<
  RootStackScreenProps<NavigationElement.PrivacySettingsScreen>
> = () => {
  const { authenticatedUser, setAuthenticatedUser } = useAuthentication();

  const [isPrivate, setIsPrivate] = useState(
    authenticatedUser?.isPrivate ?? false
  );

  const { t } = useTranslate();

  const updatePrivacySettings = async (value: boolean) => {
    try {
      setIsPrivate(value);
      await AccountApi.updatePrivacy(value);
      if (authenticatedUser) {
        const modifiedUser: UserInfo = {
          ...authenticatedUser,
          isPrivate: value,
        };
        setAuthenticatedUser(modifiedUser);
      }
    } catch (e: any) {
      setIsPrivate(!value);
    }
  };

  const renderSwitchItem = (title: keyof Translation, enabled: boolean) => {
    return (
      <View
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        paddingVertical='s'
      >
        <Text variant='poppins_m_medium'>{t(title)}</Text>
        <Switch
          onValueChange={async (value) => {
            await updatePrivacySettings(value);
          }}
          value={enabled}
        />
      </View>
    );
  };

  return (
    <ScreenShell backgroundColor='background' withoutBottom>
      <NavigationHeader title={t('privacy')} withBack />
      <View paddingHorizontal='m'>
        {renderSwitchItem('private_account', isPrivate)}

        <Text variant='poppins_xs' marginTop='m' color='gray'>
          {t('account_public_hint')}
        </Text>

        <Text variant='poppins_xs' marginTop='m' color='gray'>
          {t('account_private_hint')}
        </Text>
      </View>
    </ScreenShell>
  );
};
