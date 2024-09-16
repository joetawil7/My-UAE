/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputEndEditingEventData,
  ViewStyle,
  I18nManager,
} from 'react-native';
import { Theme, useShopifyTheme } from '@theme';
import { BottomSheetTextInput as GorhomTextInput } from '@gorhom/bottom-sheet';
import { stylesConstants } from '@styles';
import { ICON_SIZE } from '@assets';
import { BottomSheetTextInputProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';

import {
  Icon,
  LinearGradient,
  LinearGradientProps,
  TouchableOpacity,
  View,
  ViewProps,
} from '../base';

type Props = ViewProps & {
  value: string;
  onValueChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  placeholder?: string;
  secureTextEntry?: boolean;
  onError?: boolean;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  keyboardType?: KeyboardTypeOptions;
  suffixElement?: JSX.Element;
  textContentType?: 'password';
  color?: keyof Theme['colors'];
  textInputProps?: Omit<BottomSheetTextInputProps, 'textAlign'>;
  linearGradientProps?: LinearGradientProps;
  gradientBorder?: boolean;
  search?: boolean;
};

export const BottomSheetTextInput = (props: Props) => {
  const {
    value,
    onValueChange,
    style,
    onEndEditing,
    keyboardType,
    placeholder,
    width,
    height,
    secureTextEntry,
    onError,
    suffixElement,
    color,
    textContentType,
    textInputProps,
    linearGradientProps,
    gradientBorder,
    search,
  } = props;

  const theme = useShopifyTheme();

  return (
    <View
      borderRadius={stylesConstants.CONTAINER_BORDER_RADIUS_MAX}
      style={[style]}
      height={height ?? stylesConstants.TEXT_FIELD_HEIGHT}
      width={width ?? '100%'}
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      borderWidth={onError ? 1 : 0}
      borderColor={onError ? 'danger' : undefined}
      {...props}
    >
      {gradientBorder && (
        <LinearGradient
          borderRadius={stylesConstants.CONTAINER_BORDER_RADIUS_MAX}
          position='absolute'
          width='100%'
          height='100%'
          variant={onError ? 'danger' : 'primary'}
          start={[0, 1]}
          {...linearGradientProps}
        />
      )}

      <GorhomTextInput
        onEndEditing={onEndEditing}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: props.backgroundColor
              ? theme.colors[props.backgroundColor as keyof Theme['colors']]
              : theme.colors.secondary,
            borderRadius: 12,
            margin: 1,
            color: color ? theme.colors[color] : 'white',
            paddingHorizontal: theme.spacing.m,
            fontSize: 16,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.grayDark}
        value={value}
        onChangeText={onValueChange}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        clearTextOnFocus={false}
        textContentType={textContentType}
        autoComplete='off'
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
        keyboardAppearance={theme.themeType}
        textAlignVertical='center'
        {...textInputProps}
      />

      <View marginLeft='auto' marginRight='m'>
        {search ? (
          value.length === 0 ? (
            <Icon name='search' />
          ) : (
            <TouchableOpacity
              borderRadius='max'
              backgroundColor='grayDark'
              alignItems='center'
              justifyContent='center'
              height={22}
              width={22}
              activeOpacity={0.5}
              onPress={() => onValueChange('')}
            >
              <Icon size={ICON_SIZE.xxs} name='x' />
            </TouchableOpacity>
          )
        ) : (
          suffixElement
        )}
      </View>
    </View>
  );
};
