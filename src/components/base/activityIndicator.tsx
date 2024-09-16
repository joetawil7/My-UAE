import {
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  PositionProps,
  ColorProps,
  opacity,
  visible,
  layout,
  spacing,
  position,
  useRestyle,
  composeRestyleFunctions,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import {
  ActivityIndicator as ReactNativeActivityIndicator,
  ActivityIndicatorProps as ReactNativeActivityIndicatorProps,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ReactNativeActivityIndicatorProps & {
  children?: React.ReactNode;
};

type ActivityIndicatorRestyleProps = OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  PositionProps<Theme> &
  ColorProps<Theme>;

export type ActivityIndicatorProps = CombineProps<
  NativeProps,
  ActivityIndicatorRestyleProps
>;

const activityIndicatorRestyleFunctions = composeRestyleFunctions<
  Theme,
  Omit<ActivityIndicatorProps, 'color'>
>([opacity, visible, layout, spacing, position]);

export const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({
  color = 'foreground',
  ...rest
}) => {
  const theme = useTheme();
  const c = theme.colors[color as keyof Theme['colors']];
  const props = useRestyle(activityIndicatorRestyleFunctions, rest);
  return <ReactNativeActivityIndicator color={c} {...props} />;
};
