import { createBox, BoxProps } from '@shopify/restyle';
import {
  KeyboardAvoidingView as ReactNativeKeyboardAvoidingView,
  KeyboardAvoidingViewProps as ReactNativeKeyboardAvoidingViewProps,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ReactNativeKeyboardAvoidingViewProps & {
  children?: React.ReactNode;
};
export const KeyboardAvoidingView = createBox<Theme, NativeProps, false>(
  ReactNativeKeyboardAvoidingView
);

export type KeyboardAvoidingViewProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
