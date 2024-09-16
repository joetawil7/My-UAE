import React, { useRef } from 'react';
import { Animated, FlatListProps } from 'react-native';
import { ICON_SIZE } from '@assets';
import { useShopifyTheme } from '@theme/theme';
import { stylesConstants } from '@styles/index';
import { useNavigation } from '@navigation/navigationElements';
import { ChevronLeft } from '@icons/rtl';
import { IconButton, View, Text, ActivityIndicator } from './base';

type Props = FlatListProps<any> & {
  leftHeader?: JSX.Element;
  centerHeader?: JSX.Element;
  rightHeader?: JSX.Element;
  withBack?: boolean;
  modalScreen?: boolean;
  title?: string;
  rightLoading?: boolean;
};

export const CollapsibleHeaderFlatList = (props: Props) => {
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

  const ref = useRef<Animated.FlatList<any>>(null);

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

  const getCloser = (value: any, checkOne: any, checkTwo: any) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo)
      ? checkOne
      : checkTwo;

  const handleSnap = ({ nativeEvent }: any) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (
      !(translateYNumber.current === 0 || translateYNumber.current === -50 / 2)
    ) {
      if (ref.current) {
        ref.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -50 / 2, 0) === -50 / 2
              ? offsetY + 50 / 2
              : offsetY - 50 / 2,
        });
      }
    }
  };

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
      <Animated.FlatList
        contentContainerStyle={{ paddingTop: 100 }}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleSnap}
        {...props}
        ref={ref}
      />
    </>
  );
};
