import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, ScreenShell } from '@components/base';
import { ProfileScreenTab } from '@types';
import { useScrollToTop } from '@react-navigation/native';
import { useAnimatedRef } from 'react-native-reanimated';
import { RootStackScreenProps } from '@navigation/navigationRouteParams';
import { NavigationElement } from '@navigation/navigationElements';
import { useShopifyTheme } from '@theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRenderItem } from 'react-native';
import { useFetchProfile } from '@components/hooks';
import { ProfileHeader } from './components/header/profileHeader';
import {
  AVATAR_SIZE_VALUE,
  BANNER_BOTTOM_HEIGHT_ADDITION,
  ProfileSmallHeader,
} from './components/header/profileSmallHeader';
import { ProfileTabBar } from './components/tabs/profileTabBar';
import { ProfilePostsTab } from './components/tabs/profilePostsTab';
import { ProfileGalleryTab } from './components/tabs/profileGalleryTab';

export const ProfileScreen: React.FC<
  RootStackScreenProps<
    NavigationElement.UserProfileScreen | NavigationElement.ProfileScreen
  >
> = ({ route }: any) => {
  const user = route.params?.user;

  const { profile } = useFetchProfile(user);
  const [selectedTab, setSelectedTab] = useState<ProfileScreenTab>(
    ProfileScreenTab.Posts,
  );
  const headerHeight = useRef(0);
  const lastScrollY = useRef(0);

  const firstTabScrollY = useRef(0);
  const secondTabScrollY = useRef(0);
  const thirdTabScrollY = useRef(0);
  const fourthTabScrollY = useRef(0);
  const sectionListRef = useAnimatedRef<any>();

  const theme = useShopifyTheme();
  const { bottom } = useSafeAreaInsets();

  useScrollToTop(sectionListRef);

  // useEffect(() => {
  //   const unsubscribe = navigation
  //     .getParent('BottomNavTab')
  //     .addListener('tabPress', () => {
  //       sectionListRef.current?.scrollToOffset({
  //         animated: true,
  //         offset: 0,
  //       });
  //     });
  //   return unsubscribe;
  // }, [navigation, sectionListRef, selectedTab]);

  useEffect(() => {
    switch (selectedTab) {
      case ProfileScreenTab.Posts:
        sectionListRef.current.scrollToOffset({
          offset: firstTabScrollY.current,
          animated: false,
        });
        break;
      case ProfileScreenTab.Gallery:
        sectionListRef.current.scrollToOffset({
          offset: secondTabScrollY.current,
          animated: false,
        });
        break;
      case ProfileScreenTab.Activity:
        sectionListRef.current.scrollToOffset({
          offset: thirdTabScrollY.current,
          animated: false,
        });
        break;
      default:
        sectionListRef.current.scrollToOffset({
          offset: fourthTabScrollY.current,
          animated: false,
        });
        break;
    }
  }, [sectionListRef, selectedTab]);

  const handleListsScrollSynchronization = useCallback(
    (scrollY: number) => {
      if (scrollY <= headerHeight.current + 10) {
        firstTabScrollY.current = scrollY;
        secondTabScrollY.current = scrollY;
        thirdTabScrollY.current = scrollY;
        fourthTabScrollY.current = scrollY;
      } else if (lastScrollY.current < headerHeight.current + 10) {
        firstTabScrollY.current = headerHeight.current;
        secondTabScrollY.current = headerHeight.current;
        thirdTabScrollY.current = headerHeight.current;
        fourthTabScrollY.current = headerHeight.current;
      } else {
        switch (selectedTab) {
          case ProfileScreenTab.Posts:
            firstTabScrollY.current = scrollY;
            break;
          case ProfileScreenTab.Gallery:
            secondTabScrollY.current = scrollY;
            break;
          case ProfileScreenTab.Activity:
            thirdTabScrollY.current = scrollY;
            break;
          default:
            fourthTabScrollY.current = scrollY;
            break;
        }
      }

      lastScrollY.current = scrollY;
    },
    [selectedTab],
  );

  // const renderHeader = useCallback(() => {
  //   return (
  //     <View
  //       onLayout={(event) => {
  //         headerHeight.current = event.nativeEvent.layout.height;
  //       }}
  //     >
  //       <LargeHeader
  //         headerStyle={[
  //           {
  //             paddingLeft: 0,
  //             paddingRight: 0,
  //             flexDirection: 'column',
  //             gap: 16,
  //             marginTop:
  //               AVATAR_SIZE_VALUE / 2 + BANNER_BOTTOM_HEIGHT_ADDITION - 20,
  //           },
  //         ]}
  //       >
  //         <ProfileHeader userInfo={profile} />
  //       </LargeHeader>
  //     </View>
  //   );
  // }, [profile]);

  // const renderSmallHeader = (_props: ScrollHeaderProps) => (
  //   <ProfileSmallHeader
  //     scrollY={_props.scrollY}
  //     showNavBar={_props.showNavBar}
  //     userInfo={profile}
  //   />
  // );

  // const renderItem: ListRenderItem<any> = useCallback(
  //   ({ item, index }) => {
  //     return index === 0 ? (
  //       <ProfileTabBar
  //         selectedTab={selectedTab}
  //         setSelectedTab={setSelectedTab}
  //       />
  //     ) : (
  //       item
  //     );
  //   },
  //   [selectedTab]
  // );

  const data = useMemo(
    () => [
      0,
      <ProfilePostsTab selectedTab={selectedTab} userInfo={profile} />,
      <ProfileGalleryTab selectedTab={selectedTab} userInfo={profile} />,
    ],

    [profile, selectedTab],
  );

  return (
    <ScreenShell backgroundColor="background" withoutTop withoutBottom>
      {/* <FlatListWithHeaders
        data={data}
        HeaderComponent={renderSmallHeader}
        LargeHeaderComponent={renderHeader}
        renderItem={renderItem}
        disableAutoFixScroll
        ignoreLeftSafeArea
        ignoreRightSafeArea
        headerFadeInThreshold={0.2}
        disableLargeHeaderFadeAnim
        style={{ flex: 1, backgroundColor: theme.colors.background }}
        contentContainerStyle={[
          {
            paddingBottom: bottom,
            flexGrow: 1,
            backgroundColor: theme.colors.background,
          },
        ]}
        containerStyle={{ backgroundColor: theme.colors.background }}
        stickyHeaderIndices={[1]}
        onEndReachedThreshold={1}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        windowSize={12}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          handleListsScrollSynchronization(event.nativeEvent.contentOffset?.y);
        }}
        onScrollEndDrag={(event) => {
          handleListsScrollSynchronization(event.nativeEvent.contentOffset?.y);
        }}
        ref={sectionListRef}
      /> */}
    </ScreenShell>
  );
};
