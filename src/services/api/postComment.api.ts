import { PostComment } from '@types';
import { del, get, post } from './api.base';

const CONTROLLER_URL = 'post-comment/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const getPostComments = (
  postId: string,
  count = 10,
  paginationToken?: string
): Promise<PostComment[]> => {
  const route = getRoute(`${postId}?count=${count}${paginationToken ?? ''}`);

  return get(route);
};

const postCommentCreate = (
  postId: string,
  content: string
): Promise<{ id: string }> => {
  const route = getRoute(`${postId}/create`);

  const body = {
    content,
  };

  return post(route, body);
};

const postCommentDelete = (commentId: string): Promise<any> => {
  const route = getRoute(`${commentId}/delete`);

  return del(route);
};

const getCommentReplies = (
  commentId: string,
  count = 5,
  paginationToken?: string
): Promise<PostComment[]> => {
  const route = getRoute(
    `${commentId}/replies?count=${count}${paginationToken ?? ''}`
  );

  return get(route);
};

const commentReplyCreate = (
  commentId: string,
  content: string
): Promise<{ id: string }> => {
  const route = getRoute(`${commentId}/reply`);

  const body = {
    content,
  };

  return post(route, body);
};

export const PostCommentApi = {
  getPostComments,
  postCommentCreate,
  postCommentDelete,
  getCommentReplies,
  commentReplyCreate,
};
