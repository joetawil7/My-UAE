import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Keyboard, KeyboardEvent } from 'react-native';
import { AnimatedView } from './base';

export const KeyboardAccessory = (props: PropsWithChildren) => {
  const { children } = props;

  const paddingInput = useSharedValue(0);
  const paddingInputAnimationStyle = useAnimatedStyle(() => {
    return {
      marginBottom: paddingInput.value,
    };
  });

  const keyboardWillShow = useCallback(
    (event: KeyboardEvent) => {
      paddingInput.value = withTiming(event.endCoordinates.height - 30, {
        duration: event.duration,
      });
    },
    [paddingInput]
  );

  const keyboardWillHide = useCallback(
    (event: KeyboardEvent) => {
      paddingInput.value = withTiming(0, {
        duration: event.duration,
      });
    },
    [paddingInput]
  );

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
  }, [keyboardWillShow, keyboardWillHide]);

  return (
    <AnimatedView
      style={paddingInputAnimationStyle}
      backgroundColor='background'
    >
      {children}
    </AnimatedView>
  );
};
