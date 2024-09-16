import { Globals, StorageKeys } from '@globals';
import { SecureStore } from '@services/secureStore';
import { LocalUser } from '@types';

const API_URL = 'https://pocapi-dev.azurewebsites.net/';
// const API_URL = 'http://192.168.2.176:3001/';
// const API_URL = 'http://localhost:3001/';

let accessToken = '';
let accessTokenUserId = '';
let accessTokenTime: Date | undefined;
const accessTokenExpireInMinutes = 25;

export const refreshAccessToken = async (
  currentUser?: LocalUser
): Promise<{
  accessToken: string;
}> => {
  if (!currentUser) {
    throw Error('User is not authorized');
  }

  const route = 'auth/refresh-access-token';

  return get(route, false, currentUser.refreshToken);
};

const getAccessToken = async () => {
  if (!Globals.userId) {
    throw new Error('No authorized user');
  }

  if (accessToken && accessTokenUserId === Globals.userId && accessTokenTime) {
    const now = new Date();

    if (
      now.getTime() - accessTokenTime.getTime() <
      accessTokenExpireInMinutes * 60 * 1000
    ) {
      return;
    }
  }

  try {
    const currentUser = (await SecureStore.getItem(
      StorageKeys.CURRENT_USER,
      true
    )) as LocalUser;

    const response = await refreshAccessToken(currentUser);

    const localUser: LocalUser = {
      ...currentUser,
      accessToken: response.accessToken as string,
    };
    await SecureStore.setItem(StorageKeys.CURRENT_USER, localUser, true);

    const _accessToken = response.accessToken;
    setTokenData(_accessToken);
  } catch (e: unknown) {
    /* empty */
  }
};

export const setTokenData = (_accessToken: string) => {
  accessToken = _accessToken;
  accessTokenUserId = Globals.userId;
  accessTokenTime = new Date();
};

export const handleResponse = async (response: Response) => {
  let json;
  try {
    json = await response.json();
  } catch (e: unknown) {
    json = {};
  }
  if (response.ok) {
    return json;
  }
  const error = new Error();
  (error as any).response = response;
  (error as any).json = json;
  (error as any).status = response.status;
  throw error;
};

export const get = async (
  route: string,
  auth = true,
  refreshToken?: string,
  messagingSessionId?: string
) => {
  const url = API_URL + route;

  if (auth) {
    await getAccessToken();
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${refreshToken ?? accessToken}`,
      'content-type': 'application/json',
      'x-messaging-session-id': messagingSessionId ?? '',
    },
  });
  return handleResponse(response);
};

export const post = async (
  route: string,
  body: any,
  auth = true,
  formData?: FormData,
  messagingSessionId?: string
) => {
  const url = API_URL + route;

  if (auth) {
    await getAccessToken();
  }

  const response = await fetch(url, {
    method: 'POST',
    body: formData ?? JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
      'x-messaging-session-id': messagingSessionId ?? '',
    },
  });

  return handleResponse(response);
};

export const del = async (
  route: string,
  auth = true,
  refreshToken?: string
) => {
  const url = API_URL + route;

  if (auth) {
    await getAccessToken();
  }

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${refreshToken ?? accessToken}`,
      'content-type': 'application/json',
    },
  });

  return handleResponse(response);
};

export const put = async (
  route: string,
  body: any,
  auth = true,
  formData?: FormData
) => {
  const url = API_URL + route;

  if (auth) {
    await getAccessToken();
  }

  const response = await fetch(url, {
    method: 'PUT',
    body: formData ?? JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  });

  return handleResponse(response);
};
