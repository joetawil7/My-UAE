import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScreenShell,
  Button,
  KeyboardAwareScrollView,
} from '@components/base';
import { I18nManager } from 'react-native';
import {
  NavigationElement,
  useNavigation,
} from '@navigation/navigationElements';
import { stylesConstants } from '@styles';
import { useTranslate } from '@localization';
import { NumberInput } from '@/src/components';
import { LoginHeader } from './components/loginHeader';

export const LoginScreen = () => {
  const navigation = useNavigation();

  const { t } = useTranslate();
  const { isRTL } = I18nManager;

  const navigateToSignUp = () => {
    navigation.push(NavigationElement.SignUpScreen);
  };

  const renderHeader = (
    <View marginTop={stylesConstants.HEADER_TOP_MARGIN} height={300}>
      <LoginHeader />
    </View>
  );

  const renderFooter = (
    <View
      flexDirection="row"
      alignItems="center"
      alignSelf="center"
      marginTop="auto"
      marginBottom={stylesConstants.FOOTER_BOTTOM_MARGIN}
    >
      <Text variant={stylesConstants.SMALL_FONT}>
        {t('dont_have_account')}{' '}
      </Text>
      {isRTL && <Text> </Text>}
      <TouchableOpacity activeOpacity={0.6} onPress={navigateToSignUp}>
        <Text variant={stylesConstants.SMALL_FONT} color="primary">
          {t('create_one')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenShell backgroundColor="primary">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        scrollEnabled={false}
        extraScrollHeight={120}
      >
        <View flex={1}>
          {renderHeader}
          <View
            flexGrow={1}
            marginTop="xl"
            paddingHorizontal="l"
            width="100%"
            alignSelf="center"
          >
            <NumberInput value="" onChangeText={() => {}} withShadow={false} />
            <Button
              wide
              withShadow
              size="large"
              label={t('continue')}
              marginTop={'xl'}
              onPress={() => navigation.navigate('SignUpScreen')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenShell>
  );
};
