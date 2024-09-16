import { LayoutProps } from '@shopify/restyle';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FCC } from '@utils';
import { Theme } from '@theme';
import { View } from './view';

export type ScreenShellProps = Omit<
  LayoutProps<Theme>,
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'width'
  | 'height'
  | 'aspectRatio'
  | 'maxHeight'
  | 'maxWidth'
  | 'minHeight'
  | 'minWidth'
  | 'overflow'
> & {
  withoutTop?: boolean;
  withoutBottom?: boolean;
  withoutLeft?: boolean;
  withoutRight?: boolean;
  backgroundColor?: keyof Theme['colors'];
};

export const ScreenShell: FCC<ScreenShellProps> = ({
  children,
  withoutTop,
  withoutBottom,
  withoutLeft,
  withoutRight,
  backgroundColor = 'background',
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: withoutTop ? undefined : insets.top,
        paddingBottom: withoutBottom ? undefined : insets.bottom,
        paddingLeft: withoutLeft ? undefined : insets.left,
        paddingRight: withoutRight ? undefined : insets.right,
      }}
      backgroundColor={backgroundColor}
      flex={1}
      {...rest}
    >
      {children}
    </View>
  );
};
