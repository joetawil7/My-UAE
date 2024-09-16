import React, { useRef } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  BottomSheetModal,
  Icon,
  TouchableOpacity,
  View,
  Text,
} from '@components/base';
import { NavigationElement } from '@navigation/navigationElements';
import { IconsId } from '@assets/icons/icons';
import { ICON_SIZE } from '@assets';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

export const BottomTabNavigatorBar = (
  props: BottomTabBarProps
): JSX.Element => {
  const { state, navigation, insets } = props;

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const handlePresentModalPress = () => {
    bottomSheetModalRef.current?.present();
  };

  const onPress = (route: any, isFocused: boolean) => {
    // let event;
    // if (isFocused) {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });
    // }

    if (!isFocused && !event?.defaultPrevented) {
      navigation.navigate({
        name: route.name,
        merge: true,
        params: undefined,
      });
    }
  };

  const onLongPress = (route: any) => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <>
      <View
        flexDirection='row'
        height={Math.max(insets.bottom + 50, 60)}
        borderTopWidth={1}
        backgroundColor='background'
        borderTopColor='secondary'
        justifyContent='center'
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCreatePost = route.name === NavigationElement.CreatePostStack;

          let iconName: IconsId = 'search';

          if (route.name === NavigationElement.HomeStack) {
            iconName = 'home';
          } else if (route.name === NavigationElement.SearchStack) {
            iconName = 'search';
          } else if (isCreatePost) {
            iconName = 'create-post';
          } else if (route.name === NavigationElement.ProgressStack) {
            iconName = 'progress';
          }

          return (
            <TouchableOpacity
              accessibilityRole='button'
              onPress={() => {
                if (isCreatePost) {
                  handlePresentModalPress();
                } else {
                  onPress(route, isFocused);
                }
              }}
              onLongPress={() => onLongPress(route)}
              flex={1}
              alignItems='center'
              key={route.key}
              marginTop='s'
            >
              {route.name === NavigationElement.ProfileStack ? (
                <View
                  width={28}
                  height={28}
                  borderRadius='max'
                  marginTop='2xs'
                  backgroundColor={isFocused ? 'primary' : 'white'}
                />
              ) : (
                <Icon
                  name={iconName}
                  color={
                    isCreatePost ? undefined : isFocused ? 'primary' : 'white'
                  }
                  size={ICON_SIZE.bottomNav}
                  gradientVariant={isCreatePost ? 'primary' : undefined}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <BottomSheetModal
        snapPoints={['18%']}
        withBackDrop
        ref={bottomSheetModalRef}
        index={0}
      >
        <View paddingHorizontal='m' flex={1}>
          <View borderBottomColor='background' borderBottomWidth={1}>
            <TouchableOpacity
              flexDirection='row'
              paddingBottom='s'
              onPress={() => {
                navigation.navigate({
                  name: NavigationElement.CreateNormalPostTagScreen,
                  merge: true,
                  params: undefined,
                });
                bottomSheetModalRef.current?.dismiss();
              }}
            >
              <Icon name='add-post' />
              <Text marginLeft='s'>Post</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity paddingVertical='s' flexDirection='row'>
              <Icon name='history' />
              <Text marginLeft='s'>Activity</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
};
