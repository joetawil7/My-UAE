import React from 'react';
import * as Progress from 'react-native-progress';
import { useShopifyTheme } from '@theme/theme';
import { ChevronRight } from '@icons/rtl';
import {
  Icon,
  LinearGradient,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from './base';

type Props = TouchableOpacityProps & {
  progress: number;
  disabled?: boolean;
};

export const NextButton = (props: Props) => {
  const { progress, disabled, ...rest } = props;
  const theme = useShopifyTheme();

  return (
    <TouchableOpacity
      onPress={(event) =>
        disabled || !rest.onPress ? {} : rest.onPress(event)
      }
      activeOpacity={1}
      height={70}
      width={70}
      {...rest}
    >
      <Progress.Circle
        size={70}
        progress={progress}
        borderWidth={0}
        unfilledColor={theme.colors.grayDark}
        thickness={2}
        color={theme.colors.primary}
        strokeCap='round'
      />

      <View
        position='absolute'
        borderRadius='max'
        alignItems='center'
        justifyContent='center'
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <View style={{ height: '85%', width: '85%' }}>
          <LinearGradient
            variant={disabled ? 'grayWhite' : 'primary'}
            borderRadius='max'
            alignItems='center'
            justifyContent='center'
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <Icon name={ChevronRight} color='black' />
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );
};
