import React from 'react';
import { stylesConstants } from '@styles';
import { Text } from './text';
import { Snackbar, SnackbarProps } from './snackbar';

export type ToastProps = Omit<SnackbarProps, 'children'> & {
  message?: string;
};

export const Toast: React.FC<ToastProps> = ({ message, ...rest }) => {
  return (
    <Snackbar borderRadius='m' {...rest}>
      <Text
        color='white'
        variant={stylesConstants.SMALL_FONT}
        textAlign='center'
      >
        {message}
      </Text>
    </Snackbar>
  );
};
