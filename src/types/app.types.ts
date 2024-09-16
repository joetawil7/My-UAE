import {
  GoogleLocation,
  Media,
  PostTag,
  UserInfo,
  UserState,
} from './api.types';

export interface PasswordValidState {
  upper: boolean;
  lower: boolean;
  number: boolean;
  special: boolean;
  eight: boolean;
  valid: boolean;
}

export enum ProfileScreenTab {
  Posts = 0,
  Gallery = 1,
  Activity = 2,
  Progress = 3,
}

export interface UserNotificationSubscription {
  post: boolean;
  subscribedUser: string;
  user: string;
}

export interface LocalUser {
  id: string;
  refreshToken: string;
  accessToken: string;
  userState: UserState;
}

export interface PostInterActionState {
  reaction?: string;
  bookmarked?: boolean;
}

export interface ReactionStats {
  like: number;
  fire: number;
  muscle: number;
}

export interface NormalPost {
  id: string;
  content: string;
  mentions: string[];
  media: Media[];
  user?: UserInfo;
  postTags?: PostTag[];
  location?: GoogleLocation;
  createdAt?: string;
  userId?: string;
  interactionState?: PostInterActionState;
  stats?: {
    bookmarksCount: number;
    commentsCount: number;
  };
  reactionStats?: ReactionStats;
}

export enum Reaction {
  fire = 'fire',
  like = 'like',
  muscle = 'muscle',
  funny = 'funny',
}

export interface Emoji {
  value: any;
  type: Reaction;
  width: number;
}

export interface PostComment {
  id: string;
  postId: string;
  content: string;
  createdAt: string;
  userId: string;
  userInfo: UserInfo;
  interactionState?: PostInterActionState;
  mentions?: string[];
  stats?: {
    repliesCount?: number;
  };
  isPosting?: boolean;
  newPostedItem?: boolean;
  reactionStats?: ReactionStats;
}

export interface CommentSection {
  comment: PostComment;
  data: PostComment[];
}

export interface RequestItem {
  id: string;
  request: () => Promise<any>;
}

export interface CachedItem<T> {
  data: T;
  cacheTime: Date;
}

export type RequestPromiseType =
  | 'accountRequest'
  | 'authRequest'
  | 'googleRequest'
  | 'notificationSubscriptionRequest'
  | 'postRequest'
  | 'postCommentRequest'
  | 'postCommentReactionRequest'
  | 'postReactionRequest'
  | 'searchRequest'
  | 'userRequest'
  | 'userFeedRequest'
  | 'postBookmark'
  | 'postBookmarkCollection'
  | 'userFollow'
  | 'userFollowRequest'
  | 'notificationSettings';

export interface PostBookmarkCollection {
  id: string;
  name: string;
  media?: Media[];
  createdAt?: string;
}

export interface RadioButtonType {
  id: string;
  label: string;
  value: string;
}

export const defaultRadioOptions: RadioButtonType[] = [
  {
    id: '0',
    label: 'Off',
    value: 'Off',
  },
  {
    id: '1',
    label: 'On',
    value: 'On',
  },
];

export const privacyRadioOptions: RadioButtonType[] = [
  {
    id: '0',
    label: 'people_i_follow',
    value: 'people_i_follow',
  },
  {
    id: '1',
    label: 'everyone',
    value: 'everyone',
  },
];

export interface PostBookmark {
  id: string;
  createdAt: string;
  post: NormalPost;
}

export interface UserBlock {
  id: string;
  createdAt: string;
  blockedUser: UserInfo;
}

export type NotificationType =
  | 'Reply'
  | 'Comment'
  | 'Reaction'
  | 'Follow'
  | 'SentFollowRequest'
  | 'AcceptFollowRequest';

export interface UserNotification {
  createdAt: string;
  executorUser: UserInfo;
  id: string;
  type: NotificationType;
  actionId: string;
  post?: NormalPost;
  data?: NotificationReactionData;
  comment?: PostComment;
  reply?: PostComment;
  softDeleted?: boolean;
}

export interface NotificationReactionData {
  type: Reaction;
}

export interface FollowerRequest {
  id: string;
  createdAt: string;
  senderUser: UserInfo;
}

export interface FollowingRequest {
  id: string;
  createdAt: string;
  receiverUser: UserInfo;
}

export interface FollowerRequestInfo {
  count: number;
  receivedFollowRequests: FollowerRequest[];
}

export interface ChatMessage {
  id: string;
  senderUserId: string;
  receiverUserId: string;
  text?: string;
  createdAt: string;
  received?: boolean;
  media?: Media;
  mediaId?: string;
}

export interface Chat {
  user: UserInfo;
  messages: ChatMessage[];
}

export interface MessagesSection {
  date: string;
  data: ChatMessage[];
}

export interface DecryptedMessageFile {
  [id: string]: string | undefined;
}

export interface MessagingCredentials {
  messagingKey: string;
  sessionId: string;
  sessionDate: string;
}
