import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { EditProfileScreen } from '@screens/editProfile/editProfileScreen';
import { EditProfileNameScreen } from '@screens/editProfile/editProfileNameScreen';
import { EditProfileUsernameScreen } from '@screens/editProfile/editProfileUsernameScreen';
import { EditProfilePictureScreen } from '@screens/editProfile/editProfilePictureScreen';
import { EditProfileBioScreen } from '@screens/editProfile/editProfileBioScreen';
import { EditProfileGenderScreen } from '@screens/editProfile/editProfileGenderScreen';
import { EditProfileBirthDateScreen } from '@screens/editProfile/editProfileBirthDateScreen';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';

const Stack = createStackNavigator<RootStackParamList>();

export const EditProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.EditProfileScreen}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfilePictureScreen}
        component={EditProfilePictureScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfileNameScreen}
        component={EditProfileNameScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfileUsernameScreen}
        component={EditProfileUsernameScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfileBioScreen}
        component={EditProfileBioScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfileGenderScreen}
        component={EditProfileGenderScreen}
      />
      <Stack.Screen
        name={NavigationElement.EditProfileBirthDateScreen}
        component={EditProfileBirthDateScreen}
      />
    </Stack.Navigator>
  );
};
