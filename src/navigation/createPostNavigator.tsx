import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { CreateNormalPostScreen } from '@screens/createPost/createNormalPostScreen';
import { CreateNormalPostTagScreen } from '@screens/createPost/createNormalPostTagScreen';
import { modalStackConfig, stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';
import { RootStackParamList } from './navigationRouteParams';

const Stack = createStackNavigator<RootStackParamList>();

export const CreatePostStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={NavigationElement.CreateNormalPostTagScreen}
        component={CreateNormalPostTagScreen}
        options={stackConfig}
      />
      <Stack.Screen
        name={NavigationElement.CreateNormalPostScreen}
        component={CreateNormalPostScreen}
        options={modalStackConfig}
      />
    </Stack.Navigator>
  );
};
