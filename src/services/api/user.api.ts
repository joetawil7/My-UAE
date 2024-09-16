import { UserInfo } from '@types';
import { get } from './api.base';

const CONTROLLER_URL = 'user/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getUser = (
  userId: string,
  loadStats = true,
  loadRelationship = true
): Promise<UserInfo> => {
  const route = getRoute(
    `${userId}?loadStats=${loadStats}&loadRelationship=${loadRelationship}`
  );

  return get(route);
};

export const UserApi = {
  getUser,
};
