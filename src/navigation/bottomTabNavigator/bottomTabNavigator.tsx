import React, { useCallback, useEffect } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { ProfileStack } from '@navigation/profileNavigator';
import { HomeStack } from '@navigation/homeNavigator';
import { CreatePostStack } from '@navigation/createPostNavigator';
import { socketManager } from '@services/socket';
import { useAuthentication } from '@services/authentication';
import { FileSystemManager } from '@services/fileSystemManager';
import { NavigationElement } from '../navigationElements';
import { BottomTabNavigatorBar } from './bottomTabNavigatorBar';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { authenticatedUser } = useAuthentication();

  useEffect(() => {
    socketManager.connect(authenticatedUser?.accessToken as string);
  }, [authenticatedUser?.accessToken]);

  const createMessagesFileSystem = useCallback(async () => {
    // await FileSystemManager.deleteDocumentFile(
    //   `messages/a0399c42-a5cf-4bc4-b2d0-61bf0730924f`
    // );

    await FileSystemManager.checkAndCreateDir('messages');
    await FileSystemManager.checkAndCreateDir('messagesDateWithUser');
  }, []);

  useEffect(() => {
    createMessagesFileSystem();
  }, [createMessagesFileSystem]);

  const renderTabBar = useCallback(
    (props: BottomTabBarProps) => <BottomTabNavigatorBar {...props} />,
    []
  );

  return (
    <Tab.Navigator
      id='BottomNavTab'
      screenOptions={{ headerShown: false }}
      tabBar={renderTabBar}
    >
      <Tab.Screen name={NavigationElement.HomeStack} component={HomeStack} />
      <Tab.Screen
        name={NavigationElement.CreatePostStack}
        component={CreatePostStack}
        listeners={() => ({
          tabPress: (event) => {
            event.preventDefault();
          },
        })}
      />
      <Tab.Screen
        name={NavigationElement.ProfileStack}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};
