import { PostBookmark } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'post-bookmark';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getPostBookmarks = (
  paginationToken?: string,
  count = 10
): Promise<PostBookmark[]> => {
  const route = getRoute(`?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

const addPostBookmark = (postId: string): Promise<any> => {
  const route = getRoute(`/${postId}/create`);

  return post(route, {});
};

const removePostBookmark = (postId: string): Promise<any> => {
  const route = getRoute(`/${postId}/delete`);

  return del(route);
};

export const PostBookmarkApi = {
  getPostBookmarks,
  addPostBookmark,
  removePostBookmark,
};
