import {
  BoxProps,
  composeRestyleFunctions,
  useRestyle,
} from '@shopify/restyle';
import {
  LinearGradient as ExpoLinearGradient,
  LinearGradientProps as ExpoLinearGradientProps,
} from 'expo-linear-gradient';
import React from 'react';
import { Theme, boxRestyleFunctions, useShopifyTheme } from '@theme';
import { CombineProps } from '@utils';

type NativeProps = ExpoLinearGradientProps & {
  children?: React.ReactNode;
};
type StyleProps =
  | Omit<BoxProps<Theme, false>, 'start' | 'end'> &
      (
        | {
            colors: string[];
            variant?: keyof Omit<Theme['linearGradientVariants'], 'defaults'>;
          }
        | {
            colors?: string[];
            variant: keyof Omit<Theme['linearGradientVariants'], 'defaults'>;
          }
      );

export type LinearGradientProps = CombineProps<NativeProps, StyleProps>;

const gradientRestyleFunctions = composeRestyleFunctions<
  Theme,
  Omit<
    LinearGradientProps,
    'variant' | 'colors' | 'start' | 'end' | 'locations'
  >
>(boxRestyleFunctions as never[]);

export const LinearGradient: React.FC<LinearGradientProps> = ({
  variant,
  colors,
  start,
  end,
  locations,
  ...rest
}) => {
  const theme = useShopifyTheme();
  const props = useRestyle(gradientRestyleFunctions, rest);
  const colorProps: NativeProps = variant
    ? (theme.linearGradientVariants[variant] as unknown as { colors: string[] })
    : { colors };

  const startProps = start ?? [0, 0.5];
  const endProps = end ?? [1, 0.5];
  const locationsProps = locations ?? [0.2, 1];
  return (
    <ExpoLinearGradient
      start={startProps}
      end={endProps}
      locations={locationsProps}
      {...colorProps}
      {...props}
    />
  );
};
