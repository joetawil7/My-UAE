import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScreenShell,
  KeyboardAwareScrollView,
  Icon,
} from '@components/base';
import { stylesConstants } from '@styles';
import { useShopifyTheme } from '@theme/theme';
import { NavigationHeader, useGlobalNotifications } from '@components';
import { Api, useAuthentication } from '@services';
import { ICON_SIZE } from '@assets';
import { Timer } from '@components/timer';
import { useTranslate } from '@localization';
import {
  NavigationElement,
  useNavigation,
} from '../../navigation/navigationElements';
import { RootStackScreenProps } from '../../navigation/navigationRouteParams';
import { CodeInputField } from '@/src/components/codeField';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

export const VerifyNumberScreen: React.FC<
  RootStackScreenProps<NavigationElement.VerifyNumberScreen>
> = ({ route }) => {
  const [isTimer, setIsTimer] = useState(true);
  const [numberOfResend, setNumberOfResend] = useState(0);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { upgradeRefreshToken } = useAuthentication();

  const theme = useShopifyTheme();
  const navigation = useNavigation();
  const { makeToast } = useGlobalNotifications();
  const { t } = useTranslate();

  // const onVerify = async () => {
  //   if (code.length === 4) {
  //     setLoading(true);
  //     try {
  //       await Api.auth.verifyEmail(code);
  //       await upgradeRefreshToken();
  //       navigation.push(NavigationElement.CreateAccountStack);
  //     } catch (e: any) {
  //       if (e.json.error.includes('not valid')) {
  //         makeToast({ message: t('invalid_code'), position: 'top' });
  //       }
  //     }

  //     setLoading(false);
  //   }
  // };

  const resendVerifyCode = async () => {
    try {
      if (numberOfResend < 2) {
        setIsTimer(true);
        setNumberOfResend((prev) => prev + 1);
        await Api.auth.sendVerificationCode();
      }
    } catch (e: unknown) {
      setIsTimer(false);
      setNumberOfResend(3);
      /* empty */
    }
  };

  const renderResendCode = (
    <View flexDirection="row" alignItems="center" gap="xs">
      <Text
        textAlign="center"
        color="gray"
        variant={stylesConstants.SMALL_FONT}
      >
        {t('have_not_received_code')}
      </Text>
      {numberOfResend >= 2 && !isTimer ? (
        <Text variant={stylesConstants.SMALL_FONT} color="secondary">
          {t('contact_support')}
        </Text>
      ) : isTimer ? (
        <Timer
          seconds={60}
          color="secondary"
          onTimerEnd={() => setIsTimer(false)}
        />
      ) : (
        <TouchableOpacity
          onPress={resendVerifyCode}
          flexDirection="row"
          alignItems="center"
          gap="2xs"
        >
          <Icon name="restart" size={ICON_SIZE.s} color="secondary" />
          <Text color="secondary" variant={stylesConstants.SMALL_BUTTON_FONT}>
            {t('resend')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ScreenShell backgroundColor="primary" withoutBottom>
      <KeyboardAwareScrollView scrollEnabled={false} backgroundColor={'white'}>
        <NavigationHeader
          leftHeader={
            <TouchableOpacity
              onPress={() => navigation.navigate(NavigationElement.LoginScreen)}
            >
              <Text variant={stylesConstants.SMALL_FONT} color="grayDarker">
                {t('cancel')}
              </Text>
            </TouchableOpacity>
          }
          title={t('verification')}
          withoutBorder
          withBack
        />

        <View
          flexGrow={1}
          marginTop={stylesConstants.NAV_HEADER_BOTTOM_MARGIN}
          paddingHorizontal="m"
          alignItems="center"
          gap="l"
          maxWidth={600}
          alignSelf="center"
        >
          <View>
            <LottieView
              autoPlay
              style={{
                width: Dimensions.get('window').width,
                height: 150,
              }}
              source={require('@assets/lottie/lock.json')}
            />
            <Text textAlign="center" variant={stylesConstants.HEADER_FONT}>
              {t('please_verify_email')}
            </Text>
            <Text textAlign="center" color="grayDark" marginTop="s">
              {t('code_sent_to')}:{'\n'}
              <Text textAlign="center" color="gray" variant="poppins_m_bold">
                {route.params.number}
              </Text>
            </Text>
          </View>
          <CodeInputField code={code} setCode={setCode} />
          {renderResendCode}
        </View>
      </KeyboardAwareScrollView>
    </ScreenShell>
  );
};
