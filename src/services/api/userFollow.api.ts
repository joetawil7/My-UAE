import { del, get, post } from './api.base';

const CONTROLLER_URL = 'user-follow/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const followUser = (userId: string): Promise<any> => {
  const route = getRoute('create');
  const body = { userId };

  return post(route, body);
};

const unfollowUser = (userId: string): Promise<any> => {
  const route = getRoute(`${userId}`);

  return del(route);
};

const getUserFollowing = (userId: string): Promise<any> => {
  const route = getRoute(`${userId}/following`);

  return get(route);
};

const getUserFollowers = (userId: string): Promise<any> => {
  const route = getRoute(`${userId}/followers`);

  return get(route);
};

export const UserFollowAPi = {
  followUser,
  unfollowUser,
  getUserFollowing,
  getUserFollowers,
};
