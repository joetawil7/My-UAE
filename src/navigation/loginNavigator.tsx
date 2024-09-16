import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LoginScreen } from '@screens/login/loginScreen';
import { SignUpScreen } from '@screens/signUp/signUpScreen';
import { stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';
import { SharedStackScreens } from './sharedNavigator';
import { CreateAccountStack } from './createAccountNavigator';
import { VerifyNumberScreen } from '@screens/verifyNumber/verifyNumberScreen';

const Stack = createStackNavigator<RootStackParamList>();

type Props = { number?: string };

export const LoginStack = (props: Props) => {
  const { number } = props;
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackConfig,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.LoginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        name={NavigationElement.SignUpScreen}
        component={SignUpScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name={NavigationElement.VerifyNumberScreen}
        component={VerifyNumberScreen}
        initialParams={{ number }}
      />
      <Stack.Screen
        name={NavigationElement.CreateAccountStack}
        component={CreateAccountStack}
        options={{
          gestureEnabled: false,
        }}
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
