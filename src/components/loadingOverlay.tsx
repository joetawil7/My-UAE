import React from 'react';
import * as Progress from 'react-native-progress';
import { View } from './base';

export const LoadingOverlay = () => {
  return (
    <View
      position='absolute'
      width='100%'
      height='100%'
      backgroundColor='background'
      opacity={0.7}
      zIndex='max'
      alignContent='center'
      justifyContent='center'
    >
      <View width='100%' alignItems='center'>
        <Progress.Circle
          size={40}
          indeterminate
          borderWidth={4}
          color='white'
          strokeCap='round'
          endAngle={0.7}
        />
      </View>
    </View>
  );
};
