import { ICON_SIZE } from '@assets';
import { IconsId } from '@assets/icons/icons';
import { AnimatedView, Icon, TouchableOpacity } from '@components/base';
import { useShopifyTheme } from '@theme/theme';
import { ProfileScreenTab } from '@types';
import React from 'react';
import { Dimensions } from 'react-native';

interface Props {
  selectedTab: ProfileScreenTab;
  setSelectedTab: (tab: ProfileScreenTab) => void;
}

const { width } = Dimensions.get('window');

export const ProfileTabBarRaw = (props: Props) => {
  const { selectedTab, setSelectedTab } = props;

  const theme = useShopifyTheme();

  const filterTabIcon = (tab: ProfileScreenTab) => {
    let iconName: IconsId;
    switch (tab) {
      case ProfileScreenTab.Posts:
        iconName = 'posts';
        break;
      case ProfileScreenTab.Gallery:
        iconName = 'gallery';
        break;
      case ProfileScreenTab.Activity:
        iconName = 'history';
        break;
      case ProfileScreenTab.Progress:
        iconName = 'flow';
        break;
      default:
        iconName = 'posts';
        break;
    }

    return (
      <Icon
        name={iconName}
        size={ICON_SIZE.m}
        color={selectedTab === tab ? 'white' : 'grayDark'}
      />
    );
  };

  const renderTabItem = (tab: ProfileScreenTab) => {
    return (
      <TouchableOpacity
        flex={1}
        justifyContent='center'
        alignItems='center'
        style={[
          tab === selectedTab && {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.primary,
          },
        ]}
        onPress={() => setSelectedTab(tab)}
      >
        {filterTabIcon(tab)}
      </TouchableOpacity>
    );
  };

  return (
    <AnimatedView
      height={50}
      flexDirection='row'
      width={width}
      backgroundColor='background'
      borderBottomColor='secondary'
      borderBottomWidth={0.2}
    >
      {renderTabItem(ProfileScreenTab.Posts)}
      {renderTabItem(ProfileScreenTab.Gallery)}
      {renderTabItem(ProfileScreenTab.Activity)}
      {renderTabItem(ProfileScreenTab.Progress)}
    </AnimatedView>
  );
};

export const ProfileTabBar = React.memo(ProfileTabBarRaw);
