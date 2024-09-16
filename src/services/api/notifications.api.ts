import { UserNotification } from '@types';
import { get, put } from './api.base';

const CONTROLLER_URL = 'notification/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getNotifications = (
  paginationToken?: string,
  reverse?: boolean,
  count = 10
): Promise<UserNotification[]> => {
  const route = getRoute(
    `all?count=${count}${paginationToken ?? ''}${
      reverse ? `&reverse=${reverse}` : ''
    }`
  );

  return get(route);
};

const getLastSeenNotification = (): Promise<{ lastSeen: string }> => {
  const route = getRoute(`last-seen`);

  return get(route);
};

const sendLastSeenNotification = (lastSeen: string): Promise<any> => {
  const route = getRoute(`last-seen`);

  const body = {
    lastSeen,
  };

  return put(route, body);
};

const getNotificationsUnseenCount = (): Promise<{ count: number }> => {
  const route = getRoute(`unseen-count`);

  return get(route);
};

export const NotificationsApi = {
  getNotifications,
  getLastSeenNotification,
  sendLastSeenNotification,
  getNotificationsUnseenCount,
};
