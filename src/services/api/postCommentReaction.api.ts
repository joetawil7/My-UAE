import { Reaction } from '@types';
import { del, post, put } from './api.base';

const CONTROLLER_URL = 'post-comment-reaction/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const postCommentReactionCreate = (
  commentId: string,
  type: Reaction
): Promise<any> => {
  const route = getRoute(`${commentId}/create`);

  const body = {
    type,
  };

  return post(route, body);
};

const postCommentReactionUpdate = (
  commentId: string,
  type: Reaction
): Promise<any> => {
  const route = getRoute(`${commentId}/update`);

  const body = {
    type,
  };

  return put(route, body);
};

const postCommentReactionDelete = (commentId: string): Promise<any> => {
  const route = getRoute(`${commentId}/delete`);

  return del(route);
};

export const PostCommentReactionApi = {
  postCommentReactionCreate,
  postCommentReactionUpdate,
  postCommentReactionDelete,
};
