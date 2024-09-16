import { StackScreenProps } from '@react-navigation/stack';
import {
  NormalPost,
  NotificationSettingType,
  PostBookmarkCollection,
  PostTag,
  UserInfo,
} from '@types';

type LoginStackRouteParams = {
  LoginStack: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  VerifyNumberScreen: {
    number: string;
  };
  CreateAccountScreen: undefined;
  VerifyResetPasswordScreen: {
    number: string;
  };
  ResetPasswordScreen: {
    token: string;
  };
};

type CreateAccountStackRouteParams = {
  CreateAccountStack: undefined;
  CreateAccountProfilePictureScreen: undefined;
  CreateAccountNameScreen: undefined;
  CreateAccountUsernameScreen: undefined;
  CreateAccountBirthDateScreen: undefined;
  CreateAccountGenderScreen: undefined;
  CreateAccountPolicyScreen: undefined;
};

type AppStackRouteParams = {
  BottomNavigator: undefined;
  NotificationsScreen: undefined;
  ChatScreen: undefined;
  PostScreen: {
    post: NormalPost;
  };
  DirectMessagesScreen: {
    user: UserInfo;
  };
};

type HomeStackRouteParams = {
  HomeScreen: undefined;
};

type SearchStackRouteParams = {
  SearchScreen: undefined;
};

type CreatePostStackRouteParams = {
  CreatePostStack: undefined;
  CreateNormalPostTagScreen: undefined;
  CreateNormalPostScreen: {
    postTags: PostTag[];
  };
};

type ProgressStackRouteParams = {
  ProgressScreen: undefined;
};

type ProfileStackRouteParams = {
  ProfileScreen: undefined;
  ProfileSettingsScreen: undefined;
  BookmarksScreen: undefined;
  BookmarkPostsScreen: {
    collection: PostBookmarkCollection;
  };
  NotificationsSettingsScreen: undefined;
  NotificationFollowSettingsScreen: {
    settings: NotificationSettingType;
  };
  NotificationMessagesSettingsScreen: {
    settings: NotificationSettingType;
  };
  NotificationCommentsLikesSettingsScreen: {
    settings: NotificationSettingType;
  };
  NotificationPostsMentionsSettingsScreen: {
    settings: NotificationSettingType;
  };
  BlockedUsersScreen: undefined;
  PrivacySettingsScreen: undefined;
};

type EditProfileStackRouteParams = {
  EditProfileStack: undefined;
  EditProfileScreen: undefined;
  EditProfilePictureScreen: undefined;
  EditProfileNameScreen: undefined;
  EditProfileUsernameScreen: undefined;
  EditProfileBioScreen: undefined;
  EditProfileGenderScreen: undefined;
  EditProfileBirthDateScreen: undefined;
};

type SharedStackRouteParams = {
  UserProfileScreen: {
    user: UserInfo;
  };
  FollowStatsScreen: {
    username: string;
    userId: string;
    followers: boolean;
  };
  FollowRequestsScreen: undefined;
};

export type RootStackParamList = LoginStackRouteParams &
  CreateAccountStackRouteParams &
  AppStackRouteParams &
  HomeStackRouteParams &
  SearchStackRouteParams &
  CreatePostStackRouteParams &
  ProgressStackRouteParams &
  ProfileStackRouteParams &
  EditProfileStackRouteParams &
  SharedStackRouteParams;

export type RootStackScreenProps<TScreen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, TScreen>;
