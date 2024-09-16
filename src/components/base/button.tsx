import { StyleSheet } from 'react-native';
import {
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from '@shopify/restyle';

import { Theme } from '@theme';
import React, { PropsWithChildren } from 'react';
import { LinearGradientPoint } from 'expo-linear-gradient';
import { stylesConstants } from '@styles';
import { Text, TextProps } from './text';
import { View, ViewProps } from './view';
import { LinearGradient } from './linearGradient';
import { ActivityIndicator } from './activityIndicator';
import { TouchableOpacity } from './touchableOpacity';

type RestyleProps = PropsWithChildren<
  SpacingProps<Theme> &
    BorderProps<Theme> &
    BackgroundColorProps<Theme> &
    ViewProps
>;

export type ButtonProps = RestyleProps & {
  onPress?: () => void;
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  activeOpacity?: number;
  labelProps?: TextProps;
  gradientStart?: LinearGradientPoint;
  gradientEnd?: LinearGradientPoint;
  gradientVariant?: keyof Theme['linearGradientVariants'];
  gradientLocations?: number[];
  gradientBorder?: boolean;
  color?: keyof Theme['colors'];
  size?: 'small' | 'medium' | 'large';
  wide?: boolean;
  withShadow?: boolean;
  backgroundColor?: keyof Theme['colors'];
  borderRadius?: keyof Theme['borderRadii'];
};

export const Button = ({
  onPress,
  label,
  disabled,
  loading,
  activeOpacity,
  labelProps,
  gradientStart,
  gradientEnd,
  gradientVariant,
  gradientLocations,
  gradientBorder,
  color,
  size,
  wide,
  withShadow,
  backgroundColor,
  borderRadius,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.6}
      justifyContent="center"
      alignItems="center"
      width={
        wide
          ? '100%'
          : size === 'large'
            ? 58
            : size === 'medium'
              ? 48
              : size
                ? 40
                : undefined
      }
      height={
        size === 'large' ? 58 : size === 'medium' ? 160 : size ? 125 : undefined
      }
      backgroundColor={backgroundColor ?? 'white'}
      borderRadius={borderRadius ?? 'm'}
      shadowColor={'gray'}
      shadowOpacity={0.2}
      shadowRadius={5}
      shadowOffset={{ width: 0, height: 8 }}
      {...rest}
    >
      <>
        {gradientVariant && (
          <LinearGradient
            style={StyleSheet.absoluteFill}
            start={gradientStart}
            end={gradientEnd}
            variant={gradientVariant}
            locations={gradientLocations}
            borderRadius={borderRadius ?? 'm'}
          />
        )}

        {gradientBorder && (
          <>
            <LinearGradient
              borderRadius={borderRadius ?? 'm'}
              position="absolute"
              width="100%"
              height="100%"
              variant="primary"
              start={[0, 1]}
            />

            <View
              style={[StyleSheet.absoluteFill, { margin: 0.2 }]}
              backgroundColor={backgroundColor ?? 'white'}
              borderRadius={borderRadius ?? 'm'}
            />
          </>
        )}

        {loading ? (
          <ActivityIndicator color={color ?? 'black'} />
        ) : label ? (
          <Text
            variant={stylesConstants.MEDIUM_BUTTON_FONT}
            color={color ?? (disabled ? 'grayDark' : 'black')}
            {...labelProps}
          >
            {label}
          </Text>
        ) : (
          rest.children
        )}
      </>
    </TouchableOpacity>
  );
};
