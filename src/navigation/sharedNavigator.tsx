import { ProfileScreen } from '@screens/profile/profileScreen';
import { stackConfig } from './stackNavigationConfig';
import { NavigationElement } from './navigationElements';

export const SharedStackScreens = [
  {
    name: NavigationElement.UserProfileScreen,
    component: ProfileScreen,
    options: { ...stackConfig },
  },
];
