import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ProfileScreen } from '@screens/profile/profileScreen';
import { ProfileSettingsScreen } from '@screens/profileSettings/profileSettingsScreen';
import { NotificationsSettingsScreen } from '@screens/profileSettings/notificationsSettingsScreen';
import { NotificationFollowSettingsScreen } from '@screens/profileSettings/notificationSettingsScreens/notificationFollowSettingsScreen';
import { NotificationMessagesSettingsScreen } from '@screens/profileSettings/notificationSettingsScreens/notificationMessagesSettingsScreen';
import { NotificationCommentsLikesSettingsScreen } from '@screens/profileSettings/notificationSettingsScreens/notificationCommentsLikesSettingsScreen';
import { NotificationPostsMentionsSettingsScreen } from '@screens/profileSettings/notificationSettingsScreens/notificationPostsMentionsSettingsScreen';
import { BlockedUsersScreen } from '@screens/profileSettings/blockedUsersScreen';
import { PrivacySettingsScreen } from '@screens/profileSettings/privacySettingsScreen';
import { stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';
import { SharedStackScreens } from './sharedNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackConfig,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.ProfileScreen}
        component={ProfileScreen}
      />

      <Stack.Screen
        name={NavigationElement.ProfileSettingsScreen}
        component={ProfileSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.NotificationsSettingsScreen}
        component={NotificationsSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.NotificationFollowSettingsScreen}
        component={NotificationFollowSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.NotificationMessagesSettingsScreen}
        component={NotificationMessagesSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.NotificationCommentsLikesSettingsScreen}
        component={NotificationCommentsLikesSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.NotificationPostsMentionsSettingsScreen}
        component={NotificationPostsMentionsSettingsScreen}
      />

      <Stack.Screen
        name={NavigationElement.BlockedUsersScreen}
        component={BlockedUsersScreen}
      />

      <Stack.Screen
        name={NavigationElement.PrivacySettingsScreen}
        component={PrivacySettingsScreen}
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
