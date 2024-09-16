import { Gender, Media, UpdateProfileInfoRequest, UserInfo } from '@types';
import { get, post } from './api.base';

const CONTROLLER_URL = 'account/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const usernameExists = (username: string): Promise<{ exists: boolean }> => {
  const route = getRoute('username-exists');
  const body = { username };

  return post(route, body);
};

const updateProfileInfo = (
  profileInfo: UpdateProfileInfoRequest,
  pictureFile?: any
): Promise<any> => {
  const route = getRoute('update-profile-info');
  const formData = new FormData();
  if (pictureFile) {
    formData.append('profilePicture', pictureFile);
  }
  formData.append('name', profileInfo.name);
  formData.append('username', profileInfo.username);
  formData.append('gender', profileInfo.gender);
  formData.append('birthDate', profileInfo.birthDate);

  return post(route, {}, true, formData);
};

const updateProfilePicture = (profilePicture: any): Promise<Media> => {
  const route = getRoute('update-profile-picture');
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);

  return post(route, {}, true, formData);
};

const updateName = (name: string) => {
  const route = getRoute('update-name');
  const body = { name };

  return post(route, body);
};

const updateUsername = (username: string) => {
  const route = getRoute('update-username');
  const body = { username };

  return post(route, body);
};

const updateBirthDate = (birthDate: string) => {
  const route = getRoute('update-birth-date');
  const body = { birthDate };

  return post(route, body);
};

const updateGender = (gender: Gender) => {
  const route = getRoute('update-gender');
  const body = { gender };

  return post(route, body);
};

const updateBio = (bio: string) => {
  const route = getRoute('update-bio');
  const body = { bio };

  return post(route, body);
};

const updatePrivacy = (isPrivate: boolean) => {
  const route = getRoute('update-privacy');
  const body = { isPrivate };

  return post(route, body);
};

const getMyUserInfo = (): Promise<UserInfo> => {
  const route = getRoute('me');
  return get(route, true);
};

export const AccountApi = {
  usernameExists,
  updateProfileInfo,
  updateProfilePicture,
  updateName,
  updateUsername,
  updateBirthDate,
  updateGender,
  updateBio,
  updatePrivacy,
  getMyUserInfo,
};
