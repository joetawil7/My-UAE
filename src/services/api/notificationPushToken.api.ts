import { UserInfo } from '@types';
import { Platform } from 'react-native';
import { post } from './api.base';

const CONTROLLER_URL = 'notification-push-token/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const sendPushToken = (token: string): Promise<UserInfo[]> => {
  const route = getRoute('create');
  const body = { token, platform: Platform.OS };

  return post(route, body);
};

export const NotificationPushTokenApi = {
  sendPushToken,
};
