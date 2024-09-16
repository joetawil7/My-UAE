import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAtomValue } from 'jotai';
import { profileRefreshing } from '@services/atoms';
import { ActivityIndicator } from '@components/base';

export const RefreshArrowRaw = ({ scrollY }: any) => {
  const insets = useSafeAreaInsets();

  const refreshing = useAtomValue(profileRefreshing);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [-20, 0],
      [1, 0],
      Extrapolate.CLAMP
    );

    const rotate = interpolate(
      scrollY.value,
      [-45, -35],
      [180, 0],
      Extrapolate.CLAMP
    );

    return { opacity, transform: [{ rotate: `${rotate}deg` }] };
  });

  return (
    <Animated.View
      style={[
        {
          zIndex: 2,
          position: 'absolute',
          top: insets.top + 13,
          left: 0,
          right: 0,
          alignItems: 'center',
        },
        !refreshing && animatedStyle,
      ]}
    >
      {refreshing ? (
        <ActivityIndicator />
      ) : (
        <Feather name='arrow-down' color='white' size={25} />
      )}
    </Animated.View>
  );
};

export const RefreshArrow = React.memo(RefreshArrowRaw);
