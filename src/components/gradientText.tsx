import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradientPoint } from 'expo-linear-gradient';
import { Theme } from '@theme';
import { View, ViewProps } from './base/view';
import { Text, TextProps } from './base/text';
import { LinearGradient } from './base/linearGradient';

type Props = {
  text: string;
  gradientVariant: keyof Theme['linearGradientVariants'];
  style?: StyleProp<ViewStyle>;
  start?: LinearGradientPoint | null;
  end?: LinearGradientPoint | null;
  locations?: number[] | null;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  opacity?: number;
  textProps?: TextProps;
  viewProps?: ViewProps;
};

export const GradientText = (props: Props) => {
  const {
    text,
    gradientVariant,
    style,
    start,
    end,
    locations,
    numberOfLines,
    ellipsizeMode,
    opacity,
    textProps,
    viewProps,
  } = props;

  return (
    <MaskedView
      key={text}
      style={[style]}
      maskElement={
        <View style={[styles.textContainer]} {...viewProps}>
          <Text
            style={{
              opacity,
            }}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            {...textProps}
          >
            {text}
          </Text>
        </View>
      }
    >
      <View {...viewProps}>
        <Text
          style={[styles.templateText]}
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          {...textProps}
        >
          {text}
        </Text>
        <LinearGradient
          variant={gradientVariant}
          style={styles.backgroundGradient}
          start={start}
          end={end}
          locations={locations}
        />
      </View>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  templateText: {
    color: 'transparent',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
