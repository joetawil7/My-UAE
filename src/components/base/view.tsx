import { createBox, BoxProps } from '@shopify/restyle';
import { ViewProps as ReactNativeViewProps } from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ReactNativeViewProps & {
  children?: React.ReactNode;
};
export const View = createBox<Theme, NativeProps, false>();

export type ViewProps = CombineProps<NativeProps, BoxProps<Theme, false>>;
