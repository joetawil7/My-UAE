import { UserInfo, ProfileScreenTab } from '@types';
import React, { useCallback } from 'react';
import { Text, View } from '@components/base';
import { useNavigation } from '@navigation/navigationElements';
import {
  FlatListWithHeaders,
  ScrollHeaderProps,
} from '@codeherence/react-native-header';
import { useShopifyTheme } from '@theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { ProfileTabBar } from './profileTabBar';
import { ProfileSmallHeader } from '../header/profileSmallHeader';

interface Props {
  selectedTab: ProfileScreenTab;
  onRefresh?: () => void;
  userInfo?: UserInfo;
}

export const ProfilePostsTabRaw = (props: Props) => {
  const { selectedTab, onRefresh, userInfo } = props;

  const data = Array.from(Array(100).keys());

  return (
    <View
      // visible={selectedTab === ProfileScreenTab.Posts}
      height={selectedTab === ProfileScreenTab.Posts ? '100%' : 0}
      overflow='hidden'
    >
      {data.map((item) => (
        <Text key={`hi${item}`}>{item}</Text>
      ))}
    </View>
  );
};

export const ProfilePostsTab = React.memo(ProfilePostsTabRaw);
