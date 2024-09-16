import { createBox, BoxProps } from '@shopify/restyle';
import { Theme } from '@theme';
import { CombineProps } from '@utils';
import {
  KeyboardAwareScrollView as ReactNativeKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps as ReactNativeKeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

type NativeProps = ReactNativeKeyboardAwareScrollViewProps & {
  children?: React.ReactNode;
};
export const KeyboardAwareScrollView = createBox<Theme, NativeProps, false>(
  ReactNativeKeyboardAwareScrollView
);

export type KeyboardAwareScrollViewProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
