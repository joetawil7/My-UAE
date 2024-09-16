import React from 'react';
import { SpringAnimatedView, View } from '../base';
import { useSpring } from '@react-spring/native';

interface Props {
  active: boolean;
}

export const PagingIndicatorItem = (props: Props) => {
  const { active } = props;

  const containerStyle = useSpring({
    from: {
      opacity: active ? 0 : 1,
    },
    to: {
      opacity: active ? 1 : 0,
    },
    config: {
      duration: 150,
    },
  });

  return (
    <View backgroundColor={'white'} borderRadius={'max'}>
      <SpringAnimatedView
        width={8}
        height={8}
        backgroundColor={'secondary'}
        borderRadius={'max'}
        style={containerStyle}
      ></SpringAnimatedView>
    </View>
  );
};
