import { createBox, BoxProps } from '@shopify/restyle';
import {
  Pressable as ReactNativePressable,
  PressableProps as ReactNativePressableProps,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = CombineProps<
  ReactNativePressableProps,
  {
    children?: React.ReactNode;
    unstable_pressDelay?: number;
  }
>;

export const Pressable = createBox<Theme, NativeProps, false>(
  ReactNativePressable
);

export type PressableProps = CombineProps<NativeProps, BoxProps<Theme, false>>;
