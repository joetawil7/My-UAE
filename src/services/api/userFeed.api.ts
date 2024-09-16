import { NormalPost } from '@types';
import { get } from './api.base';

const CONTROLLER_URL = 'user-feed/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getUserFeedTimeline = (
  userId: string,
  count = 3
): Promise<NormalPost[]> => {
  const route = getRoute(`${userId}/timeline?count=${count}`);

  return get(route);
};

const getUserFeedMedia = (userId: string, count = 3): Promise<any> => {
  const route = getRoute(`${userId}/media?count=${count}`);

  return get(route);
};

export const UserFeedApi = {
  getUserFeedTimeline,
  getUserFeedMedia,
};
