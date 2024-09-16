import { ICON_SIZE } from '@assets';
import { IconButton, View } from '@components/base';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  uri: string;
  onRemove: () => void;
  isSingleMedia: boolean;
  exists?: boolean;
}

const CreateNormalPostMediaPreviewItemRaw = (props: Props) => {
  const { uri, onRemove, isSingleMedia, exists } = props;

  const { width } = Dimensions.get('window');

  const imageWidthAnimationValue = useSharedValue(
    !isSingleMedia && exists ? 200 : 0
  );
  const imageWidthAnimationStyle = useAnimatedStyle(() => {
    return {
      width: imageWidthAnimationValue.value,
      height: imageWidthAnimationValue.value,
    };
  });

  useEffect(() => {
    if (isSingleMedia) {
      imageWidthAnimationValue.value = withTiming(width - 24, {
        duration: 200,
      });
    } else if (!exists) {
      imageWidthAnimationValue.value = withTiming(200, {
        duration: 200,
      });
    }
  }, [exists, imageWidthAnimationValue, isSingleMedia, width]);

  const onRemoveImage = () => {
    imageWidthAnimationValue.value = withTiming(0, {
      duration: 100,
    });
    setTimeout(() => {
      onRemove();
    }, 100);
  };

  return (
    <View>
      <Animated.Image
        source={{ uri }}
        style={[
          { borderRadius: 16, marginRight: isSingleMedia ? 0 : 8 },
          imageWidthAnimationStyle,
        ]}
      />
      <IconButton
        right={24}
        top={16}
        backgroundColor='black'
        position='absolute'
        name='x'
        borderRadius='max'
        size={ICON_SIZE.xs}
        onPress={onRemoveImage}
      />
    </View>
  );
};

export const CreateNormalPostMediaPreviewItem = React.memo(
  CreateNormalPostMediaPreviewItemRaw
);
