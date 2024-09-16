import { ProfileScreenTab, UserInfo } from '@types';
import React, { useCallback } from 'react';
import { Text, View } from '@components/base';
import { useNavigation } from '@navigation/navigationElements';
import { useShopifyTheme } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatListWithHeaders,
  ScrollHeaderProps,
} from '@codeherence/react-native-header';
import Animated from 'react-native-reanimated';
import { ProfileTabBar } from './profileTabBar';
import { ProfileSmallHeader } from '../header/profileSmallHeader';

interface Props {
  selectedTab: ProfileScreenTab;
  onRefresh?: () => void;
  userInfo?: UserInfo;
}

export const ProfileGalleryTabRaw = (props: Props) => {
  const { selectedTab, onRefresh, userInfo } = props;

  const data = Array.from(Array(100).keys());

  return (
    <View
      // visible={selectedTab === ProfileScreenTab.Gallery}
      height={selectedTab === ProfileScreenTab.Gallery ? '100%' : 0}
      overflow='hidden'
    >
      {data.map((item) => (
        <Text key={`bye${item}`}>{item}</Text>
      ))}
    </View>
  );
};

export const ProfileGalleryTab = React.memo(ProfileGalleryTabRaw);
