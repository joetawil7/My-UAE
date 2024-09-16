import {
  BackgroundColorProps,
  OpacityProps,
  VisibleProps,
  LayoutProps,
  SpacingProps,
  BorderProps,
  ShadowProps,
  PositionProps,
  ColorProps,
  TextShadowProps,
  TypographyProps,
} from '@shopify/restyle';
import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  StyleSheet as NativeStyleSheet,
} from 'react-native';
import { mapObject, MAP_OBJECT_ACTION_DELETE_KEY } from '@utils';
import { Theme } from '@theme';

// Narrow<A> helper type:
// for props like the button's variant, we do not want string type widening to apply
// the Narrow type does exactly that (just like the "as const" operator)
// from https://github.com/microsoft/TypeScript/issues/30680#issuecomment-752725353
type Cast<A, B> = A extends B ? A : B;
type Narrowable = string | number | bigint | boolean;
type Narrow<A> = Cast<
  A,
  [] | (A extends Narrowable ? A : never) | { [K in keyof A]: Narrow<A[K]> }
>;

type NativeStyle = ViewStyle | TextStyle | ImageStyle;
type AnyRestyleProps = BackgroundColorProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  PositionProps<Theme> &
  ColorProps<Theme> &
  TextShadowProps<Theme> &
  TypographyProps<Theme> & {
    style?: NativeStyle;
  };

type RestyleStyles = { [style: string]: AnyRestyleProps };

export const StyleSheet = {
  ...NativeStyleSheet,
  create: <T extends RestyleStyles>(styles: Narrow<T>): T => {
    const tStyles = styles as T;
    const nativeStyleObjects = mapObject(tStyles, (s) => {
      if (!s.style) return MAP_OBJECT_ACTION_DELETE_KEY;
      return s.style;
    });

    // if there are no native styles, just return the styles as-is
    if (Object.keys(nativeStyleObjects).length === 0) return tStyles;

    // if there are native styles, optimize them with React Native's StyleSheet API
    const nativeStyles = NativeStyleSheet.create(nativeStyleObjects);
    return mapObject(tStyles, ({ style, ...rest }, key) => {
      if (style) {
        return { style: nativeStyles[key], ...rest };
      }
      return rest;
    }) as T;
  },
};
