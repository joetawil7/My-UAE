/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useRef, useState, useMemo } from 'react';
import { Image, useWindowDimensions, Platform, StyleSheet } from 'react-native';
import { ScrollHeaderProps } from '@codeherence/react-native-header';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
// import { BlurView } from '@react-native-community/blur';
import { AnimatedView, View, TouchableOpacity } from '@components/base';
import ImageView from 'react-native-image-viewing';
import { UserInfo } from '@types';
import { BlurView } from 'expo-blur';
import { Globals } from '@globals';
import {
  ProfileAvatar,
  AVATAR_SIZE_MAP,
  RefreshArrow,
  HeaderOptions,
  OwnHeaderOptions,
} from './components';

const AVATAR_SIZE = 'lg';
const AVATAR_START_SCALE = 1;
const AVATAR_END_SCALE = 0.5;
export const AVATAR_SIZE_VALUE = AVATAR_SIZE_MAP[AVATAR_SIZE];
export const BANNER_BOTTOM_HEIGHT_ADDITION = AVATAR_SIZE_VALUE;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface Props {
  userInfo: UserInfo;
}

export const ProfileSmallHeader: React.FC<ScrollHeaderProps & Props> = ({
  userInfo,
  showNavBar,
  scrollY,
}) => {
  const isOwnProfile = Globals.userId === userInfo.id;

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const imageModalUri = useRef(require('@assets/img/cover.png'));

  const { width, height } = useWindowDimensions();
  const bannerHeight = useSharedValue(48 + BANNER_BOTTOM_HEIGHT_ADDITION);

  const blurStyle = useAnimatedProps(() => {
    const intensity = interpolate(
      Math.abs(scrollY.value),
      [0, 200],
      [0, 40],
      Extrapolate.CLAMP
    );

    return {
      intensity,
    };
  });

  const profileImageScale = useDerivedValue(() => {
    return interpolate(
      scrollY.value,
      [0, BANNER_BOTTOM_HEIGHT_ADDITION],
      [AVATAR_START_SCALE, AVATAR_END_SCALE],
      Extrapolate.CLAMP
    );
  });

  const bannerTranslationStyle = useAnimatedStyle(() => {
    const bannerTranslation = interpolate(
      scrollY.value,
      [0, BANNER_BOTTOM_HEIGHT_ADDITION],
      [0, -BANNER_BOTTOM_HEIGHT_ADDITION],
      Extrapolate.CLAMP
    );

    return { transform: [{ translateY: bannerTranslation }] };
  });

  // This allows the profile container to translate as the user scrolls.
  const profileContainerTranslationStyle = useAnimatedStyle(() => {
    const translateY = -scrollY.value + BANNER_BOTTOM_HEIGHT_ADDITION / 2;

    return { transform: [{ translateY }] };
  });

  // Once the profile image has been scaled down, we allow the profile container to be
  // hidden behind the banner. This is done by setting the zIndex to -1.
  const rootProfileRowZIndexStyle = useAnimatedStyle(() => {
    return { zIndex: profileImageScale.value <= AVATAR_END_SCALE ? -1 : 1 };
  });

  // Slow down the avatar's translation to allow it to scale down and
  // still stay at its position.
  const profileImageScaleStyle = useAnimatedStyle(() => {
    const profileImageTranslationY = interpolate(
      profileImageScale.value,
      [AVATAR_START_SCALE, AVATAR_END_SCALE],
      [0, AVATAR_SIZE_VALUE / 2],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { scale: profileImageScale.value },
        { translateY: profileImageTranslationY },
      ],
    };
  });

  const animatedScaleStyle = useAnimatedStyle(() => {
    const scaleY = interpolate(
      scrollY.value,
      [0, -(height + bannerHeight.value)],
      [1, 7.5],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scaleY }, { scaleX: scaleY }],
    };
  }, [bannerHeight.value, height, scrollY.value]);

  const renderCoverWithOverlay = useMemo(
    () => (
      <AnimatedView style={[StyleSheet.absoluteFill, bannerTranslationStyle]}>
        <AnimatedView
          onLayout={(e) => {
            bannerHeight.value = e.nativeEvent.layout.height;
          }}
          style={animatedScaleStyle}
        >
          <View style={{ marginBottom: -BANNER_BOTTOM_HEIGHT_ADDITION }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                imageModalUri.current = require('@assets/img/cover.png');
                setImageModalVisible(true);
              }}
            >
              <AnimatedImage
                source={require('@assets/img/cover.png')}
                resizeMode='cover'
                style={[{ width, height: '100%' }]}
              />
              {Platform.OS === 'ios' && (
                <AnimatedBlurView
                  animatedProps={blurStyle}
                  style={[StyleSheet.absoluteFill]}
                  tint='default'
                />
              )}
            </TouchableOpacity>
            <RefreshArrow scrollY={scrollY} />
          </View>
        </AnimatedView>
      </AnimatedView>
    ),
    [
      animatedScaleStyle,
      bannerHeight,
      bannerTranslationStyle,
      blurStyle,
      scrollY,
      width,
    ]
  );

  const renderAvatar = useMemo(
    () => (
      <AnimatedView paddingHorizontal='m' style={[rootProfileRowZIndexStyle]}>
        <AnimatedView
          position='absolute'
          left={16}
          style={[profileContainerTranslationStyle]}
        >
          <AnimatedView style={profileImageScaleStyle}>
            <ProfileAvatar
              size={AVATAR_SIZE}
              source={require('@assets/img/profile.png')}
            />
          </AnimatedView>
        </AnimatedView>
      </AnimatedView>
    ),
    [
      profileContainerTranslationStyle,
      profileImageScaleStyle,
      rootProfileRowZIndexStyle,
    ]
  );

  return (
    <View position='relative' style={{ zIndex: 1 }}>
      {renderCoverWithOverlay}

      {isOwnProfile ? (
        <OwnHeaderOptions
          userInfo={userInfo}
          showNavBar={showNavBar}
          scrollY={scrollY}
        />
      ) : (
        <HeaderOptions
          userInfo={userInfo}
          showNavBar={showNavBar}
          scrollY={scrollY}
        />
      )}

      {renderAvatar}
      <ImageView
        images={[imageModalUri.current]}
        imageIndex={0}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      />
    </View>
  );
};
