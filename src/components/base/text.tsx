import React, { forwardRef, PropsWithChildren } from 'react';
import {
  composeRestyleFunctions,
  layout,
  LayoutProps,
  TextProps as RestyleTextProps,
  textRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import {
  TextProps as ReactNativeTextProps,
  Text as ReactNativeText,
} from 'react-native';
import { Theme } from '@theme';
import { CombineProps } from '@utils';

export type BaseTextProps = {
  children?: React.ReactNode;
  color?: keyof Theme['colors'];
  variant?: keyof Theme['textVariants'];
  // textAlign?: keyof StyleProp<TextStyle>;
};

export type TextProps = CombineProps<
  ReactNativeTextProps,
  CombineProps<
    RestyleTextProps<Theme, false> & LayoutProps<Theme>,
    BaseTextProps
  >
>;

const makeTextRestyleFunctions = composeRestyleFunctions<Theme, TextProps>([
  layout,
  ...(textRestyleFunctions as never[]), // workaround for shorthand types
]);

export const makeText = <TProps extends BaseTextProps, TRef>(
  Component:
    | React.ComponentType
    | React.ForwardRefExoticComponent<React.RefAttributes<TRef>>
) =>
  forwardRef<TRef, TProps>(({ variant, color, ...rest }, ref) => {
    // do not apply default style in nested text components
    const variantOrDefault = variant ?? 'default';
    const defaultColor = 'white';
    const props = useRestyle(makeTextRestyleFunctions, {
      variant: variantOrDefault,
      color: color ?? defaultColor,
      ...rest,
    } as TextProps);
    return (
      <Component
        {...({ ref } as Record<string, unknown>)}
        {...(props as Record<string, unknown>)}
      />
    );
  });

const TextRaw = makeText<TextProps, ReactNativeText>(ReactNativeText);

export const Text = (props: PropsWithChildren & TextProps) => {
  const { children, textAlign } = props;

  return (
    <TextRaw textAlign={textAlign ?? 'left'} {...props}>
      {children}
    </TextRaw>
  );
};
