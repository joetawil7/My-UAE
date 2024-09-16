import React, { forwardRef } from 'react';
import {
  BoxProps,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import {
  Platform,
  ScrollView as NativeScrollView,
  ScrollViewProps as NativeScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Theme, useShopifyTheme, boxRestyleFunctions } from '@theme';
import { CombineProps } from '@utils';

export type ScrollViewProps<T = NativeScrollViewProps> = CombineProps<
  CombineProps<T, BoxProps<Theme, false>>,
  {
    children?: React.ReactNode;
    contentContainerStyle?: BoxProps<Theme, false> & {
      style?: StyleProp<ViewStyle>;
    };
  }
>;

type BoxPropsWithStyle = BoxProps<Theme, false> & {
  style?: StyleProp<ViewStyle>;
};
const scrollRestyleFunctions = composeRestyleFunctions<
  Theme,
  BoxPropsWithStyle
>(boxRestyleFunctions);

export type FlatListPropsBase<T> = CombineProps<
  ScrollViewProps<T>,
  {
    contentContainerStyle?: BoxPropsWithStyle;
    columnWrapperStyle?: BoxPropsWithStyle;
  }
>;

export const makeScrollView =
  <TRef,>() =>
  <TProps extends FlatListPropsBase<T>, T>(component: React.ComponentType<T>) =>
    forwardRef<TRef, TProps>(
      ({ contentContainerStyle, columnWrapperStyle, ...rest }, ref) => {
        const { style: contentContainerStyle2 } = useRestyle(
          scrollRestyleFunctions,
          contentContainerStyle ?? {}
        );
        const { style: columnWrapperStyle2 } = useRestyle(
          scrollRestyleFunctions,
          columnWrapperStyle ?? {}
        );
        const props = useRestyle(
          scrollRestyleFunctions,
          rest as BoxPropsWithStyle
        );

        const theme = useShopifyTheme();
        const Component: React.ComponentType<T> = component;
        return (
          <Component
            ref={ref}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            alwaysBounceVertical={false}
            columnWrapperStyle={columnWrapperStyle && columnWrapperStyle2}
            contentContainerStyle={
              contentContainerStyle && [
                // this prevents shadow clipping on android
                Platform.OS === 'android' && {
                  paddingBottom: theme.spacing.m,
                  marginBottom: -theme.spacing.m,
                },
                contentContainerStyle2,
              ]
            }
            {...(props as unknown as T)}
          />
        );
      }
    );

export const ScrollView = makeScrollView<NativeScrollView>()(NativeScrollView);
