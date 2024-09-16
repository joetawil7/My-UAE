import { Easing, Platform } from 'react-native';
import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 2,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const closeConfig: TransitionSpec = {
  animation: 'timing',
  config: {
    duration: 150,
    easing: Easing.linear,
  },
};

export const stackConfig: StackNavigationOptions =
  Platform.OS === 'ios'
    ? {
        gestureResponseDistance: 100,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: ({ current, layouts }) => {
          const translateX = current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          });

          return {
            cardStyle: {
              transform: [{ translateX }],
            },
          };
        },
        headerStyleInterpolator: HeaderStyleInterpolators.forFade,
      }
    : {
        gestureDirection: 'horizontal',
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        gestureResponseDistance: 100,
      };

export const modalStackConfig: StackNavigationOptions = {
  presentation: 'modal',
  headerShown: false,
  headerBackTitleVisible: false,
  headerTintColor: 'white',
  gestureEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  gestureResponseDistance: 100,
};
