import { UserInfo } from '@types';
import { post, get } from './api.base';

const CONTROLLER_URL = 'auth/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const emailLogin = (login: string, password: string): Promise<UserInfo> => {
  const route = getRoute('email');
  const body = { login, password };

  return post(route, body, false);
};

const emailSignUp = (email: string, password: string): Promise<UserInfo> => {
  const route = getRoute('email-signup');
  const body = { email, password };

  return post(route, body, false);
};

const sendVerificationCode = (): Promise<any> => {
  const route = getRoute('send-verification-code');
  const body = {};

  return post(route, body);
};

const verifyEmail = (code: string): Promise<any> => {
  const route = getRoute('verify-email');
  const body = { code };

  return post(route, body);
};

const appleAuth = (token: string): Promise<UserInfo> => {
  const route = getRoute('apple');
  const body = { token };

  return post(route, body, false);
};

const googleAuth = (token: string): Promise<UserInfo> => {
  const route = getRoute('google');
  const body = { token };

  return post(route, body, false);
};

const forgotPassword = (email: string): Promise<any> => {
  const route = getRoute('forgot-password');
  const body = { email };

  return post(route, body, false);
};

const verifyResetPassword = (
  email: string,
  code: string
): Promise<{ token: string }> => {
  const route = getRoute('verify-reset-password-token');
  const body = { email, code };

  return post(route, body, false);
};

const resetPassword = (token: string, password: string): Promise<any> => {
  const route = getRoute('reset-password');
  const body = { token, password };

  return post(route, body, false);
};

const logout = (): Promise<any> => {
  const route = getRoute('logout');

  return get(route);
};

const upgradeRefreshToken = (refreshToken: string): Promise<UserInfo> => {
  const route = getRoute('upgrade-refresh-token');

  return get(route, false, refreshToken);
};

export const AuthApi = {
  emailLogin,
  emailSignUp,
  sendVerificationCode,
  verifyEmail,
  appleAuth,
  googleAuth,
  forgotPassword,
  verifyResetPassword,
  resetPassword,
  logout,
  upgradeRefreshToken,
};
