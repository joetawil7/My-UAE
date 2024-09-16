import {
  backgroundColor,
  border,
  createTheme,
  layout,
  opacity,
  position,
  shadow,
  spacing,
  ThemeProvider as RestyleThemeProvider,
  useTheme as useRestyleTheme,
  visible,
} from '@shopify/restyle';
import React from 'react';
import { mapObject } from '@utils';

const colors = {
  primary: '#39F3FF',
  primaryDark: '#0A4E7A',
  secondary: '#1C94B7',

  background: '#141415',
  accent: '#FAFD63',

  white: '#ffffff',
  black: '#000000',

  grayLight: '#C5C5C5',
  gray: '#a6a6a6',
  grayDark: '#616060',
  grayDarker: '#323233',
  grayTransparent: 'rgba(0, 0, 0, 0.6)',

  danger: '#DC372B',

  defaultPicture: '#58595b',

  transparent: 'transparent',
};

export const transparentColors = mapObject(colors, (f) => `${f}20`);

export const buttonShadow = {
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 5 },
  shadowRadius: 15,
  elevation: 3,
};

export const fontFamilies = {
  poppins_light: 'Poppins-Light',
  poppins_regular: 'Poppins-Regular',
  poppins_medium: 'Poppins-Medium',
  poppins_bold: 'Poppins-Bold',
  poppins_extraBold: 'Poppins-ExtraBold',
  roboto_regular: 'Roboto-Regular',
  paytoneOne_regular: 'PaytoneOne-Regular',
};

const fontSizes = {
  xxs: 10,
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 24,
  xxl: 28,
  '3xl': 36,
  '4xl': 42,
};

type FontSizeKey = keyof typeof fontSizes;
type FontFamilyKey = keyof typeof fontFamilies;

export const useCustomFont = (
  sizeKey?: FontSizeKey,
  familyKey?: FontFamilyKey,
) => {
  const fontSize = sizeKey ? fontSizes[sizeKey] : fontSizes.m;
  const fontFamily = familyKey
    ? fontFamilies[familyKey]
    : fontFamilies.poppins_regular;

  return {
    fontFamily,
    fontSize,
  };
};

export const theme = createTheme({
  colors,
  transparentColors,
  fontSizes,
  spacing: {
    // Inspiration: https://material.io/design/layout/spacing-methods.html#light
    none: 0,
    '3xs': 2,
    '2xs': 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 56,
    auto: 'auto',
  },
  zIndices: {
    none: -1,
    l0: 0,
    l1: 100,
    l2: 200,
    max: 1000,
  },
  opacities: {
    m: 0.6,
  },
  borderSizes: {
    m: 1.5,
  },
  borderRadii: {
    xxs: 4,
    xs: 8,
    s: 12,
    m: 16,
    l: 24,
    xl: 32,
    max: 100,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    poppins_4xl: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes['4xl'],
    },
    poppins_4xl_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes['4xl'],
    },
    poppins_4xl_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes['4xl'],
    },
    poppins_3xl: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes['3xl'],
    },
    poppins_3xl_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes['3xl'],
    },
    poppins_3xl_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes['3xl'],
    },
    poppins_xxl: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.xxl,
    },
    poppins_xxl_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.xxl,
    },
    poppins_xxl_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.xxl,
    },
    poppins_xl: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.xl,
    },
    poppins_xl_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.xl,
    },
    poppins_xl_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.xl,
    },
    poppins_xl_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.xl,
    },
    poppins_l: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.l,
    },
    poppins_l_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.l,
    },
    poppins_l_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.l,
    },
    poppins_l_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.l,
    },
    poppins_m: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.m,
    },
    poppins_m_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.m,
    },
    poppins_m_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.m,
    },
    poppins_m_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.m,
    },
    poppins_s: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.s,
    },
    poppins_s_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.s,
    },
    poppins_s_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.s,
    },
    poppins_s_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.s,
    },
    poppins_xs: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.xs,
    },
    poppins_xs_bold: {
      fontFamily: fontFamilies.poppins_bold,
      fontSize: fontSizes.xs,
    },
    poppins_xs_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.xs,
    },
    poppins_xs_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.xs,
    },
    poppins_xxs_medium: {
      fontFamily: fontFamilies.poppins_medium,
      fontSize: fontSizes.xxs,
    },
    poppins_xxs: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.xxs,
    },
    poppins_xxs_light: {
      fontFamily: fontFamilies.poppins_light,
      fontSize: fontSizes.xxs,
    },
    roboto_l: {
      fontFamily: fontFamilies.roboto_regular,
      fontSize: fontSizes.l,
    },
    roboto_m: {
      fontFamily: fontFamilies.roboto_regular,
      fontSize: fontSizes.m,
    },
    paytoneOne_xxl: {
      fontFamily: fontFamilies.paytoneOne_regular,
      fontSize: fontSizes.xxl,
    },
    paytoneOne_l: {
      fontFamily: fontFamilies.paytoneOne_regular,
      fontSize: fontSizes.l,
    },
    paytoneOne_m: {
      fontFamily: fontFamilies.paytoneOne_regular,
      fontSize: fontSizes.m,
    },
    default: {
      fontFamily: fontFamilies.poppins_regular,
      fontSize: fontSizes.m,
    },
  },
  // buttonVariants: {
  //   outline: (disabled: boolean, color: keyof typeof colors) => ({
  //     pressable: {
  //       opacity: disabled ? 0.4 : 1,
  //       borderWidth: 1.5,
  //       borderColor: color,
  //     },
  //     child: {
  //       color,
  //     },
  //   }),
  //   transparent: (disabled: boolean, color: keyof typeof colors) => ({
  //     pressable: {
  //       style: {
  //         backgroundColor: transparentColors[disabled ? 'background' : color],
  //       },
  //     },
  //     child: {
  //       color: disabled ? 'background' : color,
  //     },
  //   }),
  // },
  linearGradientVariants: {
    primary: { colors: ['#0083FE', '#00FFF0'] },
    secondary: { colors: ['#FF8139', '#FE4794'] },
    grayWhite: { colors: ['#333333', '#706F6F'] },
    danger: { colors: ['#DC372B', '#E41C0D'] },
  },
  themeType: 'light' as 'light' | 'dark' | 'default' | undefined,
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
  },
  themeType: 'dark',
};

export const useShopifyTheme = () => useRestyleTheme<Theme>();

interface ThemeProviderProps {
  _theme: Theme;
  children: any;
}

export const ShopifyThemeProvider = (props: ThemeProviderProps) => {
  const { _theme, children } = props;
  return <RestyleThemeProvider theme={_theme}>{children}</RestyleThemeProvider>;
};

export const boxRestyleFunctions = [
  backgroundColor,
  opacity,
  visible,
  layout,
  spacing,
  border,
  shadow,
  position,
];
