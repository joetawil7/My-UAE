import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HomeScreen } from '@screens/home/homeScreen';
import { stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';
import { SharedStackScreens } from './sharedNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackConfig,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.HomeScreen}
        component={HomeScreen}
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
