import { NotificationsApi } from '@services/api/notifications.api';
import { UserFollowRequestAPi } from '@services/api/userFollowRequest.api';
import { Events, FollowerRequestInfo, UserNotification } from '@types';
import { globalHelpers } from '@utils';
import { EventRegister } from 'react-native-event-listeners';

export class NotificationsDataManager {
  public static notifications: UserNotification[] = [];

  public static followerRequestsInfo: FollowerRequestInfo = {
    count: 0,
    receivedFollowRequests: [],
  };

  public static async fetchNotifications() {
    try {
      const response = await NotificationsApi.getNotifications(undefined);
      this.notifications = response;

      const result = await UserFollowRequestAPi.getFollowRequestsInfo(2);
      this.followerRequestsInfo = result;
    } catch (e: any) {
      /* empty */
    }
  }

  public static async loadMoreNotifications(
    lastNotification: UserNotification,
    onNoMore: () => void
  ) {
    try {
      const response = await NotificationsApi.getNotifications(
        globalHelpers.getPaginationToken(lastNotification)
      );

      if (response.length === 0) {
        onNoMore();
      }

      this.notifications = [...this.notifications, ...response];
    } catch (e: any) {
      /* empty */
    }
  }

  public static async pullToRefresh() {
    try {
      const response = await NotificationsApi.getNotifications(
        undefined,
        false,
        24
      );
      this.notifications = response;

      const result = await UserFollowRequestAPi.getFollowRequestsInfo(2);
      this.followerRequestsInfo = result;
    } catch (e: any) {
      /* empty */
    }
  }

  public static async getUnseenNotificationsCount() {
    try {
      const response = await NotificationsApi.getNotificationsUnseenCount();
      EventRegister.emit(Events.NOTIFICATIONS_UNSEEN_COUNT, {
        count: response.count,
      });
    } catch (e: any) {
      /* empty */
    }
  }
}
