import {
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
  useNavigation as useReactNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './navigationRouteParams';

export enum NavigationElement {
  // App
  BottomNavigator = 'BottomNavigator',
  PostScreen = 'PostScreen',

  // Login
  LoginStack = 'LoginStack',
  LoginScreen = 'LoginScreen',
  SignUpScreen = 'SignUpScreen',
  VerifyNumberScreen = 'VerifyNumberScreen',
  CreateAccountScreen = 'CreateAccountScreen',
  VerifyResetPasswordScreen = 'VerifyResetPasswordScreen',
  ResetPasswordScreen = 'ResetPasswordScreen',

  // Create Account
  CreateAccountStack = 'CreateAccountStack',
  CreateAccountProfilePictureScreen = 'CreateAccountProfilePictureScreen',
  CreateAccountNameScreen = 'CreateAccountNameScreen',
  CreateAccountUsernameScreen = 'CreateAccountUsernameScreen',
  CreateAccountBirthDateScreen = 'CreateAccountBirthDateScreen',
  CreateAccountGenderScreen = 'CreateAccountGenderScreen',
  CreateAccountPolicyScreen = 'CreateAccountPolicyScreen',

  // Home
  HomeStack = 'HomeStack',
  HomeScreen = 'HomeScreen',

  // Search
  SearchStack = 'SearchStack',
  SearchScreen = 'SearchScreen',

  // CreatePost
  CreatePostStack = 'CreatePostStack',
  CreateNormalPostTagScreen = 'CreateNormalPostTagScreen',
  CreateNormalPostScreen = 'CreateNormalPostScreen',

  // Progress
  ProgressStack = 'ProgressStack',
  ProgressScreen = 'ProgressScreen',

  // Profile
  ProfileStack = 'ProfileStack',
  ProfileScreen = 'ProfileScreen',

  // Edit Profile
  EditProfileStack = 'EditProfileStack',
  EditProfileScreen = 'EditProfileScreen',
  EditProfilePictureScreen = 'EditProfilePictureScreen',
  EditProfileNameScreen = 'EditProfileNameScreen',
  EditProfileUsernameScreen = 'EditProfileUsernameScreen',
  EditProfileBioScreen = 'EditProfileBioScreen',
  EditProfileGenderScreen = 'EditProfileGenderScreen',
  EditProfileBirthDateScreen = 'EditProfileBirthDateScreen',

  // Profile Menu
  ProfileMenuStack = 'ProfileMenuStack',
  ProfileSettingsScreen = 'ProfileSettingsScreen',
  BookmarksScreen = 'BookmarksScreen',
  BookmarkPostsScreen = 'BookmarkPostsScreen',
  NotificationsSettingsScreen = 'NotificationsSettingsScreen',
  NotificationFollowSettingsScreen = 'NotificationFollowSettingsScreen',
  NotificationMessagesSettingsScreen = 'NotificationMessagesSettingsScreen',
  NotificationCommentsLikesSettingsScreen = 'NotificationCommentsLikesSettingsScreen',
  NotificationPostsMentionsSettingsScreen = 'NotificationPostsMentionsSettingsScreen',
  BlockedUsersScreen = 'BlockedUsersScreen',
  PrivacySettingsScreen = 'PrivacySettingsScreen',

  // Notifications
  NotificationsScreen = 'NotificationsScreen',

  // Chat
  ChatScreen = 'ChatScreen',
  DirectMessagesScreen = 'DirectMessagesScreen',

  // Shared
  UserProfileScreen = 'UserProfileScreen',
  FollowStatsScreen = 'FollowStatsScreen',
  FollowRequestsScreen = 'FollowRequestsScreen',
}

export const useNavigation = <
  T extends
    NavigationProp<ParamListBase> = StackNavigationProp<RootStackParamList> &
    NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
>() => {
  return useReactNavigation<T>();
};
