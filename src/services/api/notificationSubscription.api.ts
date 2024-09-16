import { UserNotificationSubscription } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'notification-subscription/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const notificationSubscribeUser = (
  userId: string,
  type: string
): Promise<any> => {
  const route = getRoute('subscribe-user');
  const body = { userId, type };

  return post(route, body);
};

const notificationUnsubscribeUser = (
  userId: string,
  type: string
): Promise<any> => {
  const route = getRoute(`unsubscribe-user/${userId}/${type}`);

  return del(route);
};

const getUserNotificationSubscription = (
  userId: string
): Promise<UserNotificationSubscription> => {
  const route = getRoute(`user/${userId}`);

  return get(route);
};

const getAllUsersNotificationSubscription = (): Promise<any> => {
  const route = getRoute(`all-users`);

  return get(route);
};

export const NotificationSubscriptionApi = {
  notificationSubscribeUser,
  notificationUnsubscribeUser,
  getUserNotificationSubscription,
  getAllUsersNotificationSubscription,
};
