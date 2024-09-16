import { Reaction } from '@types';
import { del, post, put, get } from './api.base';

const CONTROLLER_URL = 'post-reaction/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const postReactionCreate = (postId: string, type: Reaction): Promise<any> => {
  const route = getRoute(`${postId}/create`);

  const body = {
    type,
  };

  return post(route, body);
};

const postReactionUpdate = (postId: string, type: Reaction): Promise<any> => {
  const route = getRoute(`${postId}/update`);

  const body = {
    type,
  };

  return put(route, body);
};

const postReactionDelete = (postId: string): Promise<any> => {
  const route = getRoute(`${postId}/delete`);

  return del(route);
};

const getPostReactionsByType = (
  postId: string,
  type: Reaction
): Promise<any> => {
  const route = getRoute(`${postId}/${type}`);

  return get(route);
};

export const PostReactionApi = {
  postReactionCreate,
  postReactionUpdate,
  postReactionDelete,
  getPostReactionsByType,
};
