import { GooglePlaceResponse } from '@types';
import { handleResponse } from './api.base';

const headers = {
  'content-type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Safari/605.1.15',
};

const API_KEY = 'AIzaSyDLu4SLjtIlVyz5w3sWu4xbJ5n7ogUThUo';
const host = 'https://maps.googleapis.com/maps/api/';

const get = (p_route: string, p_useHost = true, noCache = false) => {
  const newHeaders: { [key: string]: string } = headers;

  if (noCache) {
    newHeaders['cache-control'] = 'no-cache';
  }

  return fetch(p_useHost ? host + p_route : p_route, {
    headers: newHeaders,
  }).then((p_response) => handleResponse(p_response));
};

const searchPlaces = (keyword: string) => {
  const route = `place/autocomplete/json?input=${keyword}&key=${API_KEY}`;
  return get(route) as Promise<GooglePlaceResponse>;
};

export const GoogleApi = {
  searchPlaces,
};
