import { createBox, BoxProps } from '@shopify/restyle';
import { ViewProps as ReactNativeViewProps } from 'react-native';
import { PropsWithChildren } from 'react';
import { Theme } from '@theme';
import { CombineProps } from '@utils';
import { animated, AnimatedProps } from '@react-spring/native';

type NativeProps = PropsWithChildren<AnimatedProps<ReactNativeViewProps>>;

export const SpringAnimatedView = createBox<Theme, NativeProps, false>(
  animated.View
);

export type SpringAnimatedViewProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
