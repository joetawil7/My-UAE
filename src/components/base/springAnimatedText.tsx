import { createBox, BoxProps } from '@shopify/restyle';
import { PropsWithChildren } from 'react';
import { Theme } from '@theme';
import { CombineProps } from '@utils';
import { animated, AnimatedProps } from '@react-spring/native';
import { Text as CustomText, TextProps } from './text';

type NativeProps = PropsWithChildren<AnimatedProps<TextProps>>;

const AnimatedText = animated(CustomText);

export const SpringAnimatedText = createBox<Theme, NativeProps, false>(
  AnimatedText
);

export type SpringAnimatedTextProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
