import {
  BackgroundColorProps,
  BorderProps,
  BoxProps,
  ColorProps,
  LayoutProps,
  SpacingProps,
  SpacingShorthandProps,
  TextProps,
  TypographyProps,
  backgroundColor,
  border,
  color,
  composeRestyleFunctions,
  layout,
  spacing,
  spacingShorthand,
  textRestyleFunctions,
  typography,
  useRestyle,
} from '@shopify/restyle';
import React from 'react';
import {
  TextInput as ReactNativeTextInput,
  TextInputProps as ReactNativeTextInputProps,
  TextInputIOSProps,
  TextInputProps as NativeTextInputProps,
} from 'react-native';
import { Theme, useShopifyTheme } from '@theme';
import { CombineProps } from '@utils';
import { BaseTextProps } from './text';

type NativeProps = CombineProps<
  ReactNativeTextInputProps,
  {
    type?: InputType;
    variant?: keyof Theme['textVariants'];
    selectionColor?: keyof Theme['colors'];
    placeholderTextColor?: keyof Theme['colors'];
    underlineColorAndroid?: keyof Theme['colors'];
  }
>;

export type TextInputProps = CombineProps<
  NativeProps,
  CombineProps<
    TextProps<Theme, false> & LayoutProps<Theme> & BoxProps<Theme, false>,
    BaseTextProps
  >
>;

type InputType = 'email';

const AutoComplete = {
  email: 'email',
};
const KeyboardTypes = {
  email: 'email-address',
};
const TextContentTypes = {
  email: 'emailAddress',
};

type RestyleProps = LayoutProps<Theme> &
  SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> &
  TextProps<Theme> &
  TypographyProps<Theme> &
  ColorProps<Theme> &
  ReactNativeTextInputProps;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  layout,
  spacing,
  border,
  backgroundColor,
  typography,
  spacingShorthand,
  color,
  ...(textRestyleFunctions as never[]),
]);

type Props = RestyleProps & NativeProps;

export const TextInput = React.forwardRef<ReactNativeTextInput, Props>(
  (
    {
      variant,
      type,
      selectionColor,
      placeholderTextColor,
      underlineColorAndroid,
      keyboardAppearance,
      ...rest
    },
    ref
  ) => {
    const variantOrDefault = variant ?? 'default';
    const defaultColor = 'white';

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const props = useRestyle(restyleFunctions, {
      variant: variantOrDefault,
      color: defaultColor,
      ...rest,
    });
    const theme = useShopifyTheme();

    return (
      <ReactNativeTextInput
        underlineColorAndroid={
          underlineColorAndroid
            ? theme.colors[underlineColorAndroid]
            : 'transparent'
        }
        autoComplete={
          !type
            ? undefined
            : (AutoComplete[type] as NativeTextInputProps['autoComplete'])
        }
        keyboardType={
          !type
            ? undefined
            : (KeyboardTypes[type] as NativeTextInputProps['keyboardType'])
        }
        textContentType={
          !type
            ? undefined
            : (TextContentTypes[type] as TextInputIOSProps['textContentType'])
        }
        keyboardAppearance={keyboardAppearance ?? theme.themeType}
        selectionColor={
          selectionColor ? theme.colors[selectionColor] : undefined
        }
        placeholderTextColor={theme.colors[placeholderTextColor ?? 'grayDark']}
        {...props}
        ref={ref}
      />
    );
  }
);
