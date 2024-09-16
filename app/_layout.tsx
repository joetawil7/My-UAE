/* eslint-disable react/style-prop-object */
import { View } from '@components/base';
import { ShopifyThemeProvider, ThemeProvider, theme } from '@theme';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { LoginStack, AppStack } from '@navigation';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from '@utils';
import { loadingOverlayAtom } from '@services';
import { useAtomValue } from 'jotai';
import {
  GlobalBottomSheets,
  GlobalNotificationsProvider,
  LoadingOverlay,
  useAppState,
} from '@components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { useAuthentication } from '@services/authentication';
import { I18nextProvider } from 'react-i18next';
import { UserState } from '@types';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as Notifications from 'expo-notifications';

import { NotificationsProvider } from '@components/notificationsProvider';
import i18next from '../src/localization/i18n';

SplashScreen.preventAutoHideAsync();
enableScreens();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const RootLayout = () => {
  const { appStateVisible } = useAppState();
  // const {
  //   authenticatedUser,
  //   refreshCurrentUser,
  //   clearAuthenticatedUsers,
  //   clearCurrentUser,
  // } = useAuthentication();
  const loadingOverlay = useAtomValue(loadingOverlayAtom);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isLoading]);

  // const checkAuthenticatedUser = useCallback(async () => {
  //   try {
  //     // clearAuthenticatedUsers();
  //     // clearCurrentUser();
  //     // await refreshCurrentUser();
  //     setIsLoading(false);
  //   } catch {
  //     /* empty */
  //   }
  // }, [refreshCurrentUser]);

  // useEffect(() => {
  //   checkAuthenticatedUser();
  // }, [checkAuthenticatedUser]);

  // if (!fontsLoaded || isLoading) {
  //   return <View />;
  // }

  return (
    <I18nextProvider i18n={i18next}>
      <ThemeProvider onThemeChanged={setCurrentTheme}>
        <ShopifyThemeProvider _theme={currentTheme}>
          <ActionSheetProvider>
            <SafeAreaProvider>
              <StatusBar style="light" />
              <GlobalNotificationsProvider />
              <NotificationsProvider />
              <NavigationContainer
                independent={true}
                theme={{
                  ...DarkTheme,
                  colors: {
                    ...DarkTheme.colors,
                    background: theme.colors.background,
                  },
                }}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <BottomSheetModalProvider>
                    {loadingOverlay && <LoadingOverlay />}
                    {/* {authenticatedUser?.userState !== UserState.Completed ? ( */}
                    <LoginStack />
                    {/* ) : ( */}
                    {/* <AppStack /> */}
                    {/* )} */}
                    <GlobalBottomSheets />
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </NavigationContainer>
            </SafeAreaProvider>
          </ActionSheetProvider>
        </ShopifyThemeProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default RootLayout;
