import { CheckBox, MediumButton, NavigationHeader } from '@components';
import { ScreenShell, Text, View } from '@components/base';
import { useTranslate } from '@localization';
import { useAuthentication } from '@services';
import { stylesConstants } from '@styles/index';
import React, { useState } from 'react';

export const CreateAccountPolicyScreen = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const { upgradeRefreshToken } = useAuthentication();

  const { t } = useTranslate();

  const onCreate = async () => {
    try {
      setLoading(true);

      await upgradeRefreshToken();
    } catch (e: any) {
      /* empty */
    }

    setLoading(false);
  };

  return (
    <ScreenShell>
      <NavigationHeader withBack title={t('policy')} />
      <View paddingHorizontal='m' alignItems='center' paddingTop='xl' flex={1}>
        <View width='100%' flexDirection='row'>
          <CheckBox value={checked} onValueChange={setChecked} />
          <Text flexShrink={1} variant={stylesConstants.SMALL_FONT}>
            {t('sign_up_rule')}*
          </Text>
        </View>

        <MediumButton
          onPress={onCreate}
          label={t('create_account')}
          marginTop='auto'
          marginBottom={stylesConstants.FOOTER_BOTTOM_MARGIN}
          disabled={!checked}
          loading={loading}
          gradientVariant='primary'
        />
      </View>
    </ScreenShell>
  );
};
