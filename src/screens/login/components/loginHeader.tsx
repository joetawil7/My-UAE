import { PagingIndicator } from '@/src/components';
import { Text, View } from '@/src/components/base';
import LottieView from 'lottie-react-native';
import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';

export const LoginHeader = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const data = [
    {
      image: require('@assets/lottie/building-community.json'),
      description: 'Building',
    },
    {
      image: require('@assets/lottie/building-community.json'),
      description: 'Building',
    },
    {
      image: require('@assets/lottie/building-community.json'),
      description: 'Building',
    },
  ];

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const renderItem = useCallback(
    // eslint-disable-next-line react/no-unused-prop-types
    ({ item }: { item: any }) => (
      <View>
        <LottieView
          autoPlay
          style={{
            width: Dimensions.get('window').width,
            height: 200,
          }}
          source={item.image}
        />
        <Text>{item.description}</Text>
      </View>
    ),
    [],
  );

  const keyExtractor = (item: any, index: number) =>
    `${item.description}${index}`;

  const onViewableItemsChanged = useCallback((info: any) => {
    if (info.viewableItems.length > 0) {
      setCurrentPage(info.viewableItems[0].index);
    }
  }, []);

  return (
    <View flexDirection={'column'} height={250}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        scrollEnabled
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <PagingIndicator activePage={currentPage} totalPages={3} />
    </View>
  );
};
