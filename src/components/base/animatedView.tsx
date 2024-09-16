import { createBox, BoxProps } from '@shopify/restyle';
import { ViewProps as ReactNativeViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import { PropsWithChildren } from 'react';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = PropsWithChildren<
  Animated.AnimateProps<ReactNativeViewProps>
>;

export const AnimatedView = createBox<Theme, NativeProps, false>(Animated.View);

export type AnimatedViewProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
