import {
  NotificationSettingType,
  PostBookmark,
  PostBookmarkCollection,
  UserBlock,
  UserInfo,
  UserNotification,
} from '@types';
import { Cache } from './cache';

export class CacheManager {
  public static profile = new Cache<UserInfo>();

  public static collections = new Cache<PostBookmarkCollection[]>();

  public static collectionPosts = new Cache<PostBookmark[]>();

  public static postCollectionsIds = new Cache<string[]>();

  public static notificationsSettings = new Cache<
    NotificationSettingType | undefined
  >();

  public static blockedUsers = new Cache<UserBlock[]>();

  public static notifications = new Cache<UserNotification[]>();

  private static interval: number;

  public static init() {
    const cleanTime = 60 * 1000;
    this.interval = window.setInterval(() => {
      this.profile.clean();
    }, cleanTime);
  }

  public static removeInterval() {
    clearInterval(this.interval);
  }

  public static clear() {
    this.profile.clear();
  }
}
