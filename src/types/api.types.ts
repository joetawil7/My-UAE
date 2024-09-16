export interface UpdateProfileInfoRequest {
  profilePicture: string;
  name: string;
  username: string;
  gender: Gender;
  birthDate: string;
}

export interface UserInfo {
  id: string;
  email?: string;
  refreshToken?: string;
  accessToken?: string;
  authType?: AuthenticationType;
  userState?: UserState;
  isEmailVerified?: boolean;
  name?: string;
  username?: string;
  birthDate?: string;
  stats?: {
    followersCount?: number;
    followingCount?: number;
    postsCount?: number;
  };
  gender?: Gender;
  profilePicture?: Media;
  bio?: string;
  isPrivate?: boolean;
  createdAt?: string;
  relationship?: {
    isFollowRequested: boolean;
    isFollowed: boolean;
    isFollowers: boolean;
  };
}

export interface Media {
  url: string;
  mimeType?: string;
  id?: string;
  type?: string;
  mediaId?: string;
  filename?: string;
}

export interface NormalPostRequest {
  content: string;
  postTags?: PostTag[];
  media?: Media[];
  location?: GoogleLocation;
  mentions?: string[];
}

export interface MediaFileRequest {
  filename?: string;
  mime?: string;
  path?: string;
}

export enum PostTag {
  Health = 'health',
  Gym = 'gym',
  Cardio = 'cardio',
  Meditation = 'meditation',
  Food = 'food',
}

export interface GoogleStructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface GoogleLocation {
  description: string;
  place_id: string;
  structured_formatting: GoogleStructuredFormatting;
  terms: { value: string }[];
}

export interface GooglePlaceResponse {
  predictions: Array<GoogleLocation>;
  status: string;
}

export enum AuthenticationType {
  Email = 'Email',
  Apple = 'Apple',
  Google = 'Google',
}

export enum UserState {
  EmailVerification = 0,
  BasicInfo = 1,
  Completed = 99,
}

export type Gender = 'Male' | 'Female' | 'Unknown';

export interface NotificationSettingType {
  active?: boolean;
  follows?: 'Off' | 'On';
  comments?: 'Everyone' | 'PeopleIFollow';
  likes?: 'Everyone' | 'PeopleIFollow';
  mentions?: 'Everyone' | 'PeopleIFollow';
  messages?: 'Off' | 'On';
}

export type NotificationSettingValue =
  | 'active'
  | 'follows'
  | 'comments'
  | 'likes'
  | 'mentions'
  | 'messages';
