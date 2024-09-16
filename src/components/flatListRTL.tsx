import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

type Props = FlatListProps<any> & {
  width: number;
};

export const FlatListRTL = React.forwardRef<FlatList, Props>((props, ref) => {
  const { width } = props;

  // const getItemLayout = (_data: any[] | null | undefined, index: number) => {
  //   return {
  //     length: width,
  //     offset: width * index,
  //     index,
  //   };
  // };

  return (
    <FlatList
      initialScrollIndex={0}
      onScrollToIndexFailed={() => {}}
      horizontal
      pagingEnabled
      scrollEnabled={false}
      keyboardShouldPersistTaps="always"
      ref={ref}
      // getItemLayout={getItemLayout}
      {...props}
    />
  );
});
