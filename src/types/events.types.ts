import { AppStateStatus } from 'react-native';
import { NormalPostRequest } from './api.types';
import { UserNotification } from './app.types';

export enum Events {
  POST_IS_UPLOADING = 'POST_IS_UPLOADING',
  POST_UPLOADED = 'POST_UPLOADED',
  POST_UPLOAD_FAILED = 'POST_UPLOAD_FAILED',
  POST_COMMENTS_BOTTOM_SHEET = 'POST_COMMENTS_BOTTOM_SHEET',
  CLOSE_ALL_BOTTOM_SHEETS = 'CLOSE_ALL_BOTTOM_SHEETS',
  POST_BOOKMARK_BOTTOM_SHEET = 'POST_BOOKMARK_BOTTOM_SHEET',
  POST_BOOKMARK_STATE = 'POST_BOOKMARK_STATE',
  ADD_COLLECTION = 'ADD_COLLECTION',
  COLLECTION_REFRESH = 'COLLECTION_REFRESH',
  BOOKMARK_ITEM_BOTTOM_SHEET = 'BOOKMARK_ITEM_BOTTOM_SHEET',
  REMOVE_POST_BOOKMARK = 'REMOVE_POST_BOOKMARK',
  REFRESH_NOTIFICATIONS_SETTINGS = 'REFRESH_NOTIFICATIONS_SETTINGS',
  REMOVE_FOLLOW_REQUEST_NOTIFICATIONS = 'REMOVE_FOLLOW_REQUEST_NOTIFICATIONS',
  NEW_NOTIFICATION = 'NEW_NOTIFICATION',
  DELETED_NOTIFICATION = 'DELETED_NOTIFICATION',
  NOTIFICATIONS_UNSEEN_COUNT = 'NOTIFICATIONS_UNSEEN_COUNT',
  NOTIFICATIONS_FOLLOW_REQUEST_ACTION = 'NOTIFICATIONS_FOLLOW_REQUEST_ACTION',
  NEXT_APP_STATE = 'NEXT_APP_STATE',
  TYPING_MESSAGE = 'TYPING_MESSAGE',
  NEW_MESSAGE = 'NEW_MESSAGE',
  MEDIA_PERMISSION_REMINDER = 'MEDIA_PERMISSION_REMINDER',
  CAMERA_PERMISSION_REMINDER = 'CAMERA_PERMISSION_REMINDER',
}

export interface PostIsUploadingEvent {
  normalPost?: NormalPostRequest;
}

export interface PostCommentsBottomSheetEvent {
  postId: string;
}

export interface PostBookmarkBottomSheetEvent {
  postId: string;
  postMediaUrl: string;
}

export interface PostBookmarkStateEvent {
  postId: string;
  enabled: boolean;
}

export interface BookmarkItemBottomSheetEvent {
  id: string;
  collectionId: string;
}

export interface RemovePostBookmarkEvent {
  postId: string;
}

export interface RemoveFollowRequestNotificationsEvent {
  userId: string;
}

export interface NewNotificationEvent {
  notification: UserNotification;
}

export interface DeletedNotificationEvent {
  id: string;
  actionId: string;
}

export interface NotificationsUnseenCountEvent {
  count: number;
}

export interface NotificationsFollowRequestActionEvent {
  id: string;
}

export interface TypingMessageEvent {
  userId: string;
}

export interface NewMessageEvent {
  userId: string;
}

export interface NextAppStateEvent {
  nextAppState: AppStateStatus;
}
