import React from 'react';
import { BlurView, BlurViewProps } from 'expo-blur';
import { View } from './base/view';
import { StyleSheet } from './base/styleSheet';

export const Blur: React.FC<BlurViewProps> = ({ ...rest }) => {
  return (
    <View
      style={[StyleSheet.absoluteFill]}
      borderTopLeftRadius='l'
      borderTopRightRadius='l'
      overflow='hidden'
    >
      <BlurView intensity={85} tint='dark' style={{ flex: 1 }} {...rest} />
    </View>
  );
};
