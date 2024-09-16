import { UserInfo } from '@types';
import { post } from './api.base';

const CONTROLLER_URL = 'search/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const searchUsersByUsername = (username: string): Promise<UserInfo[]> => {
  const route = getRoute('users');
  const body = { username };

  return post(route, body);
};

export const SearchApi = {
  searchUsersByUsername,
};
