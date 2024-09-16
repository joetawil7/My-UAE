import { createBox, BoxProps } from '@shopify/restyle';
import {
  Switch as ReactNativeSwitch,
  SwitchProps as ReactNativeSwitchProps,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ReactNativeSwitchProps & {
  children?: React.ReactNode;
};
export const Switch = createBox<Theme, NativeProps, false>(ReactNativeSwitch);

export type SwitchProps = CombineProps<NativeProps, BoxProps<Theme, false>>;
