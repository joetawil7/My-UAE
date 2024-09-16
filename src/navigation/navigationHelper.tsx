import { StackNavigationProp } from '@react-navigation/stack';
import { UserState } from '@types';
import { RootStackParamList } from './navigationRouteParams';
import { NavigationElement } from './navigationElements';

const loginNavigateUserState = (
  userState: UserState,
  number: string,
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  switch (userState) {
    case UserState.EmailVerification:
      navigation.push(NavigationElement.VerifyNumberScreen, {
        number,
      });
      break;
    case UserState.BasicInfo:
      navigation.push(NavigationElement.CreateAccountStack);
      break;
    default:
      break;
  }
};

export const navigationHelper = {
  loginNavigateUserState,
};
