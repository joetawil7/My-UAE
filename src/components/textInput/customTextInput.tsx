import React from 'react';
import { stylesConstants } from '@styles';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInputEndEditingEventData,
  ViewStyle,
  TextInput as RNTextInput,
  I18nManager,
} from 'react-native';
import { ICON_SIZE } from '@assets';
import {
  Icon,
  LinearGradient,
  LinearGradientProps,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from '../base';
import { Theme, useShopifyTheme } from '../../theme';

export type CustomTextInputProps = ViewProps & {
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
  textInputProps?: TextInputProps;
  linearGradientProps?: LinearGradientProps;
  gradientBorder?: boolean;
  search?: boolean;
};

export const CustomTextInput = React.forwardRef<
  RNTextInput,
  CustomTextInputProps
>((props, ref) => {
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
      borderRadius={
        props.borderRadius ?? stylesConstants.CONTAINER_BORDER_RADIUS_MAX
      }
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
          borderRadius={
            props.borderRadius ??
            linearGradientProps?.borderRadius ??
            stylesConstants.CONTAINER_BORDER_RADIUS_MAX
          }
          position='absolute'
          width='100%'
          height='100%'
          variant={onError ? 'danger' : 'primary'}
          start={[0, 1]}
          {...linearGradientProps}
        />
      )}

      <TextInput
        onEndEditing={onEndEditing}
        variant={stylesConstants.DEFAULT_FONT}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: theme.colors.secondary,
            borderRadius: props.borderRadius
              ? theme.borderRadii[props.borderRadius]
              : 12,
            margin: 1,
            maxHeight: 60,
          },
        ]}
        color={color ?? 'white'}
        flex={1}
        paddingHorizontal='m'
        borderRadius={props.borderRadius}
        fontSize={16}
        placeholder={placeholder}
        placeholderTextColor='grayDark'
        value={value}
        onChangeText={onValueChange}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        clearTextOnFocus={false}
        textContentType={textContentType}
        autoComplete='off'
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
        ref={ref}
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
});
