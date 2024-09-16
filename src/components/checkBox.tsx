import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { stylesConstants } from '@styles';
import { Theme } from '@theme';
import { IconButton, Text, TextProps, View, ViewProps } from './base';

type Props = ViewProps & {
  style?: StyleProp<ViewStyle>;
  label?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  textProps?: TextProps;
  gradientVariant?: keyof Theme['linearGradientVariants'];
  color?: keyof Theme['colors'];
};

export const CheckBox = (props: Props): JSX.Element => {
  const {
    style,
    label,
    value,
    onValueChange,
    textProps,
    gradientVariant,
    color,
    ...rest
  } = props;

  const checkBoxGradientVariant = color
    ? undefined
    : gradientVariant ?? 'primary';

  return (
    <View style={style} flexDirection='row' alignItems='center' {...rest}>
      <IconButton
        name={value ? 'checkbox-checked' : 'checkbox'}
        color={color}
        gradientVariant={checkBoxGradientVariant}
        onPress={() => onValueChange(!value)}
      />
      <Text marginLeft='xs' variant={stylesConstants.SMALL_FONT} {...textProps}>
        {label}
      </Text>
    </View>
  );
};
