import { FollowerRequest, FollowerRequestInfo, FollowingRequest } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'user-follow-request/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const createFollowRequest = (userId: string): Promise<any> => {
  const route = getRoute('create');

  const body = { userId };

  return post(route, body);
};

const removeFollowRequest = (userId: string): Promise<any> => {
  const route = getRoute(`${userId}`);

  return del(route);
};

const acceptFollowRequest = (userId: string): Promise<any> => {
  const route = getRoute(`accept`);

  const body = { userId };

  return post(route, body);
};

const declineFollowRequest = (userId: string): Promise<any> => {
  const route = getRoute(`decline`);

  const body = { userId };

  return post(route, body);
};

const getFollowerRequests = (
  paginationToken?: string,
  count = 5
): Promise<FollowerRequest[]> => {
  const route = getRoute(`received?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

const getFollowingRequests = (
  paginationToken?: string,
  count = 5
): Promise<FollowingRequest[]> => {
  const route = getRoute(`sent?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

const getFollowRequestsInfo = (
  count?: number
): Promise<FollowerRequestInfo> => {
  const route = getRoute(`received-info${count ? `?count=${count}` : ''}`);

  return get(route);
};

export const UserFollowRequestAPi = {
  createFollowRequest,
  removeFollowRequest,
  acceptFollowRequest,
  declineFollowRequest,
  getFollowerRequests,
  getFollowingRequests,
  getFollowRequestsInfo,
};
