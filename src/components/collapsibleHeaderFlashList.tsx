import React, { useRef } from 'react';
import { Animated } from 'react-native';
import { ICON_SIZE } from '@assets';
import { useShopifyTheme } from '@theme/theme';
import { stylesConstants } from '@styles/index';
import { useNavigation } from '@navigation/navigationElements';
import { ChevronLeft } from '@icons/rtl';
import {
  AnimatedFlashList,
  FlashList,
  FlashListProps,
} from '@shopify/flash-list';
import { useScrollToTop } from '@react-navigation/native';
import { IconButton, View, Text, ActivityIndicator } from './base';

type Props = FlashListProps<any> & {
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  withBack?: boolean;
  modalScreen?: boolean;
  title?: string;
  rightLoading?: boolean;
};

export const CollapsibleHeaderFlashList = (props: Props) => {
  const {
    title,
    leftHeader,
    centerHeader,
    rightHeader,
    withBack,
    modalScreen,
    rightLoading,
  } = props;

  const theme = useShopifyTheme();
  const navigation = useNavigation();

  const ref = useRef<FlashList<any>>(null);

  useScrollToTop(ref as any);

  const scrollY = useRef(new Animated.Value(0));
  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );
  const scrollYClamped = Animated.diffClamp(scrollY.current, -200, 100);
  const translateY = scrollYClamped.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolateLeft: 'clamp',
  });

  const translateYNumber = useRef<number>();
  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  return (
    <>
      <Animated.View
        style={{
          position: 'absolute',
          zIndex: 99,
          backgroundColor: theme.colors.background,
          height: 100,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingBottom: 16,
          borderBottomColor: theme.colors.secondary,
          borderBottomWidth: 1,
          transform: [{ translateY }],
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}
      >
        <View flex={1} alignItems='flex-start'>
          {withBack ? (
            modalScreen ? (
              <IconButton
                size={ICON_SIZE.l}
                name='chevron-down'
                onPress={navigation.goBack}
              />
            ) : (
              <IconButton
                size={ICON_SIZE.l}
                name={ChevronLeft}
                onPress={navigation.goBack}
              />
            )
          ) : (
            leftHeader
          )}
        </View>
        {title ? (
          <Text variant={stylesConstants.NAVIGATION_HEADER_FONT}>{title}</Text>
        ) : (
          <View flex={1} alignItems='center'>
            {centerHeader}
          </View>
        )}
        <View flex={1} alignItems='flex-end'>
          {rightLoading ? <ActivityIndicator /> : rightHeader}
        </View>
      </Animated.View>
      <AnimatedFlashList
        contentContainerStyle={{ paddingTop: 100 }}
        onScroll={handleScroll}
        {...props}
        ref={ref}
      />
    </>
  );
};
