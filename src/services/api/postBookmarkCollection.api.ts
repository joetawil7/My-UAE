import { PostBookmark, PostBookmarkCollection } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'post-bookmark-collection';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getBookmarkCollections = (
  paginationToken?: string,
  count = 10
): Promise<PostBookmarkCollection[]> => {
  const route = getRoute(`?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

const addBookmarkCollection = (name: string): Promise<any> => {
  const route = getRoute(`/create`);

  const body = {
    name,
  };

  return post(route, body);
};

const editBookmarkCollection = (id: string, name: string): Promise<any> => {
  const route = getRoute(`/edit-name`);

  const body = {
    id,
    name,
  };

  return post(route, body);
};

const deleteBookmarkCollection = (id: string): Promise<any> => {
  const route = getRoute(`/${id}/delete`);

  return del(route);
};

const getPostBookmarksFromCollection = (
  id: string,
  paginationToken?: string,
  count = 4
): Promise<PostBookmark[]> => {
  const route = getRoute(
    `/${id}/bookmarks?count=${count}${paginationToken ?? ''}`
  );

  return get(route);
};

const addPostBookmarkToCollection = (postId: string, collectionId: string) => {
  const route = getRoute(`/${postId}/add-bookmark`);

  const body = {
    collectionId,
  };

  return post(route, body);
};

const removePostBookmarkFromCollection = (
  postId: string,
  collectionId: string
) => {
  const route = getRoute(`/${postId}/remove-bookmark/${collectionId}`);

  return del(route);
};

const getPostCollections = (postId: string): Promise<string[]> => {
  const route = getRoute(`/${postId}/collections`);

  return get(route);
};

export const PostBookmarkCollectionApi = {
  getBookmarkCollections,
  addBookmarkCollection,
  editBookmarkCollection,
  deleteBookmarkCollection,
  getPostBookmarksFromCollection,
  addPostBookmarkToCollection,
  removePostBookmarkFromCollection,
  getPostCollections,
};
