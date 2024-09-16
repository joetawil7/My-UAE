import { UserFollowRequestAPi } from '@services/api/userFollowRequest.api';
import { FollowerRequest, FollowingRequest } from '@types';
import { globalHelpers } from '@utils';

export class FollowRequestsDataManager {
  public static followerRequests: FollowerRequest[] = [];

  public static followingRequests: FollowingRequest[] = [];

  public static async fetchFollowerRequests() {
    try {
      const response = await UserFollowRequestAPi.getFollowerRequests();

      this.followerRequests = response;
    } catch (e: any) {
      /* empty */
    }
  }

  public static async loadMoreFollowerRequests(
    lastFollowerRequest: FollowerRequest,
    onNoMore: () => void
  ) {
    try {
      const response = await UserFollowRequestAPi.getFollowerRequests(
        globalHelpers.getPaginationToken(lastFollowerRequest)
      );

      if (response.length === 0) {
        onNoMore();
      }

      this.followerRequests = [...this.followerRequests, ...response];
    } catch (e: any) {
      /* empty */
    }
  }

  public static async pullToRefreshFollowerRequests() {
    try {
      const response = await UserFollowRequestAPi.getFollowerRequests(
        undefined,
        25
      );
      this.followerRequests = response;
    } catch (e: any) {
      /* empty */
    }
  }

  public static async fetchFollowingRequests() {
    try {
      const response = await UserFollowRequestAPi.getFollowingRequests();

      this.followingRequests = response;
    } catch (e: any) {
      /* empty */
    }
  }

  public static async loadMoreFollowingRequests(
    lastFollowingRequest: FollowingRequest,
    onNoMore: () => void
  ) {
    try {
      const response = await UserFollowRequestAPi.getFollowingRequests(
        globalHelpers.getPaginationToken(lastFollowingRequest)
      );

      if (response.length === 0) {
        onNoMore();
      }

      this.followingRequests = [...this.followingRequests, ...response];
    } catch (e: any) {
      /* empty */
    }
  }

  public static async pullToRefreshFollowingRequests() {
    try {
      const response = await UserFollowRequestAPi.getFollowingRequests(
        undefined,
        25
      );
      this.followingRequests = response;
    } catch (e: any) {
      /* empty */
    }
  }
}
