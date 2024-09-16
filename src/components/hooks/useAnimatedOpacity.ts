import { useState, useEffect } from 'react';
import { runOnJS, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const useAnimatedOpacity = (visible: boolean) => {
  const [animatedVisible, setAnimatedVisible] = useState(visible);

  useEffect(() => {
    if (visible) setAnimatedVisible(true);
  }, [visible]);

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(visible ? 1 : 0, undefined, () => {
        if (!visible) {
          runOnJS(setAnimatedVisible)(false);
        }
      }),
    };
  }, [setAnimatedVisible, visible]);

  return { opacityStyle: style, animatedVisible };
};
