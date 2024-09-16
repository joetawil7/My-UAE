import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreateNormalPostTagScreen } from '@screens/createPost/createNormalPostTagScreen';
import { CreateNormalPostScreen } from '@screens/createPost/createNormalPostScreen';
import { NotificationsScreen } from '@screens/notifications/notificationsScreen';
import { ChatScreen } from '@screens/chat/chatScreen';
import { DirectMessagesScreen } from '@screens/directMessages/directMessagesScreen';
import { modalStackConfig, stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';
import { BottomTabNavigator } from './bottomTabNavigator/bottomTabNavigator';
import { EditProfileStack } from './editProfileNavigator';
import { SharedStackScreens } from './sharedNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackConfig,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.BottomNavigator}
        component={BottomTabNavigator}
      />

      <Stack.Screen
        name={NavigationElement.EditProfileStack}
        component={EditProfileStack}
        options={{ ...modalStackConfig }}
      />

      <Stack.Screen
        name={NavigationElement.CreateNormalPostTagScreen}
        component={CreateNormalPostTagScreen}
        options={modalStackConfig}
      />

      <Stack.Screen
        name={NavigationElement.CreateNormalPostScreen}
        component={CreateNormalPostScreen}
        options={modalStackConfig}
      />

      <Stack.Screen
        name={NavigationElement.NotificationsScreen}
        component={NotificationsScreen}
        options={stackConfig}
      />

      <Stack.Screen
        name={NavigationElement.ChatScreen}
        component={ChatScreen}
        options={stackConfig}
      />

      <Stack.Screen
        name={NavigationElement.DirectMessagesScreen}
        component={DirectMessagesScreen}
        options={stackConfig}
      />

      {SharedStackScreens.map((item: any) => (
        <Stack.Screen
          key={`${item.name as string}`}
          options={item.options}
          name={item.name}
          component={item.component}
        />
      ))}
    </Stack.Navigator>
  );
};
