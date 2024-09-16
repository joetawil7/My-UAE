import { createBox, BoxProps } from '@shopify/restyle';
import {
  Pressable as ReactNativePressable,
  PressableProps as ReactNativePressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = Animated.AnimateProps<
  CombineProps<
    ReactNativePressableProps,
    {
      children?: React.ReactNode;
      style?: StyleProp<ViewStyle>;
      unstable_pressDelay?: number;
    }
  >
>;

const ReanimatedReactNativePressable =
  Animated.createAnimatedComponent(ReactNativePressable);
export const ReanimatedPressable = createBox<Theme, NativeProps, false>(
  ReanimatedReactNativePressable
);

export type ReanimatedPressableProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
