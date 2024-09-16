import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CombineProps } from '@utils';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@theme';
import { View, ViewProps } from './view';
import { AnimatedView } from './animatedView';
import { useAnimatedOpacity } from '../hooks';

export type SnackbarProps = CombineProps<
  ViewProps & BoxProps<Theme, false>,
  {
    visible?: boolean;
    position?: 'bottom' | 'top' | 'aboveTabBar';
  }
>;

export const Snackbar: React.FC<SnackbarProps> = ({
  children,
  visible = true,
  position = 'bottom',
  ...rest
}) => {
  const { bottom, top } = useSafeAreaInsets();

  const { animatedVisible, opacityStyle } = useAnimatedOpacity(visible);

  const config = {
    top: { top },
    bottom: { bottom: bottom + 0 },
    aboveTabBar: { bottom: bottom + 48 },
  };

  const pos = config[position];

  if (!animatedVisible) return null;

  return (
    <AnimatedView
      style={opacityStyle}
      zIndex='max'
      position='absolute'
      left={0}
      right={0}
      margin='l'
      alignItems='center'
      {...pos}
    >
      <View padding='m' backgroundColor='black' {...rest}>
        {children}
      </View>
    </AnimatedView>
  );
};
