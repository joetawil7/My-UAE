import { UserBlock } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'user-block/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const blockUser = (userId: string): Promise<any> => {
  const route = getRoute(`create`);

  const body = {
    userId,
  };

  return post(route, body);
};

const unblockUser = (userId: string): Promise<any> => {
  const route = getRoute(`${userId}`);

  return del(route);
};

const getBlockedUsers = (
  paginationToken?: string,
  count = 5
): Promise<UserBlock[]> => {
  const route = getRoute(`all?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

export const UserBlockApi = {
  blockUser,
  unblockUser,
  getBlockedUsers,
};
