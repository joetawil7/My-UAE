import { post } from './api.base';

const CONTROLLER_URL = 'messaging-key/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const registerMessagingKey = (messagingKey: string): Promise<any> => {
  const route = getRoute('register');
  const body = { messagingKey };

  return post(route, body);
};

export const MessagingKeyApi = {
  registerMessagingKey,
};
