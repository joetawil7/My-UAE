import { createBox, BoxProps } from '@shopify/restyle';
import {
  TouchableOpacity as ReactNativeTouchableOpacity,
  TouchableOpacityProps as ReactNativeTouchableOpacityProps,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';
import React from 'react';

type NativeProps = ReactNativeTouchableOpacityProps & {
  children?: React.ReactNode;
};
export const TouchableOpacityRaw = createBox<Theme, NativeProps, false>(
  ReactNativeTouchableOpacity
);

export const TouchableOpacity = (props: TouchableOpacityProps) => {
  const { activeOpacity } = props;
  return (
    <TouchableOpacityRaw activeOpacity={activeOpacity ?? 0.8} {...props} />
  );
};

export type TouchableOpacityProps = CombineProps<
  NativeProps,
  BoxProps<Theme, false>
>;
