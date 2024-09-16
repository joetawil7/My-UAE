import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreateAccountProfilePictureScreen } from '@screens/createAccount/createAccountProfilePictureScreen';
import { CreateAccountNameScreen } from '@screens/createAccount/createAccountNameScreen';
import { CreateAccountUsernameScreen } from '@screens/createAccount/createAccountUsernameScreen';
import { CreateAccountPolicyScreen } from '@screens/createAccount/createAccountPolicyScreen';
import { CreateAccountBirthDateScreen } from '@screens/createAccount/createAccountBirthDateScreen';
import { CreateAccountGenderScreen } from '@screens/createAccount/createAccountGenderScreen';
import { stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';

const Stack = createStackNavigator<RootStackParamList>();

export const CreateAccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.CreateAccountProfilePictureScreen}
        component={CreateAccountProfilePictureScreen}
        options={{ ...stackConfig, gestureEnabled: false }}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountNameScreen}
        component={CreateAccountNameScreen}
        options={stackConfig}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountUsernameScreen}
        component={CreateAccountUsernameScreen}
        options={stackConfig}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountBirthDateScreen}
        component={CreateAccountBirthDateScreen}
        options={stackConfig}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountGenderScreen}
        component={CreateAccountGenderScreen}
        options={stackConfig}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountPolicyScreen}
        component={CreateAccountPolicyScreen}
        options={stackConfig}
      />
    </Stack.Navigator>
  );
};
