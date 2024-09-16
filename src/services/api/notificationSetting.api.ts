import { NotificationSettingType } from '@types';
import { get, put } from './api.base';

const CONTROLLER_URL = 'notification-setting/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getNotificationSetting = (): Promise<NotificationSettingType> => {
  const route = getRoute(`get`);

  return get(route);
};

const updateNotificationSetting = (
  settings: NotificationSettingType
): Promise<any> => {
  const route = getRoute(`update`);

  return put(route, settings);
};

export const NotificationSettingApi = {
  getNotificationSetting,
  updateNotificationSetting,
};
