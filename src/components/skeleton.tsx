import React, { PropsWithChildren, useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { AnimatedView, View } from './base';

type Props = PropsWithChildren & { width: number; height?: number };

export const Skeleton = (props: Props) => {
  const { children, width, height } = props;

  const opacityAnimation = useSharedValue(0);
  const translateAnimation = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateAnimation.value }],
      opacity: opacityAnimation.value,
    };
  });

  useEffect(() => {
    opacityAnimation.value = withRepeat(
      withTiming(0.2, { duration: 750 }),
      -1,
      false
    );
    translateAnimation.value = withRepeat(
      withTiming(width + 50, { duration: 750 }),
      -1,
      false
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <View style={styles.container} width={width} height={height}>
      <AnimatedView style={[styles.overlay, animatedStyle]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 50,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    zIndex: 99,
    borderRadius: 50,
  },
});
