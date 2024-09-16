import React from 'react';
import { IconsId } from '@assets/icons/icons';
import { Theme } from '@theme/theme';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, TouchableOpacityProps } from './touchableOpacity';
import { Icon } from './icon';
import { View, ViewProps } from './view';
import { LinearGradient } from './linearGradient';

type Props = TouchableOpacityProps &
  ViewProps & {
    name: IconsId;
    size?: number;
    color?: keyof Theme['colors'];
    gradientVariant?: keyof Theme['linearGradientVariants'];
    withBorder?: boolean;
    circle?: boolean;
    backgroundColor?: keyof Theme['colors'];
    gradientBorderVariant?: keyof Theme['linearGradientVariants'];
    lineHeight?: number;
  };

export const IconButton = (props: Props) => {
  const {
    name,
    size,
    color,
    gradientVariant,
    withBorder,
    circle,
    backgroundColor,
    gradientBorderVariant,
    borderRadius,
    lineHeight,
    style,
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      justifyContent='center'
      alignItems='center'
      padding={gradientBorderVariant || withBorder || circle ? undefined : 'xs'}
      style={[{ margin: withBorder || circle ? 0 : -8 }, style]}
      borderWidth={withBorder && !gradientBorderVariant ? 1 : 0}
      borderColor={
        withBorder && !gradientBorderVariant ? 'grayDark' : undefined
      }
      height={withBorder || circle ? 32 : undefined}
      width={withBorder || circle ? 32 : undefined}
      borderRadius={circle ? 'max' : undefined}
      backgroundColor={backgroundColor}
      {...props}
    >
      {gradientBorderVariant && (
        <>
          <LinearGradient
            borderRadius={circle ? 'max' : borderRadius}
            position='absolute'
            width='100%'
            height='100%'
            variant={gradientBorderVariant}
            start={[0, 1]}
          />

          <View
            style={[StyleSheet.absoluteFill, { margin: 1 }]}
            backgroundColor='background'
            borderRadius={circle ? 'max' : borderRadius}
          />
        </>
      )}
      <Icon
        name={name}
        size={size}
        color={color}
        gradientVariant={gradientVariant}
        lineHeight={lineHeight}
      />
    </TouchableOpacity>
  );
};
