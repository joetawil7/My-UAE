import { Events, NormalPostRequest, PostIsUploadingEvent } from '@types';
import { EventRegister } from 'react-native-event-listeners';
import { post } from './api.base';

const CONTROLLER_URL = 'post/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const createPostApi = (postItem: NormalPostRequest) => {
  const route = getRoute('create');

  const formData = new FormData();

  formData.append('content', postItem.content);

  if (postItem.media && postItem.media.length > 0) {
    const mediaFiles = postItem.media.map((item) => {
      return { name: item.filename, type: item.mimeType, uri: item.url };
    });

    for (const media of mediaFiles) {
      formData.append('media', media as any);
    }
  }

  if (postItem.mentions && postItem.mentions.length > 0) {
    for (const mentions of postItem.mentions) {
      formData.append('mentions', mentions);
    }
  }

  return post(route, {}, true, formData);
};

const createPost = async (postItem: NormalPostRequest) => {
  const postIsUploading: PostIsUploadingEvent = {
    normalPost: postItem,
  };
  EventRegister.emit(Events.POST_IS_UPLOADING, postIsUploading);
  try {
    await createPostApi(postItem);
    EventRegister.emit(Events.POST_UPLOADED, postIsUploading);
  } catch (e) {
    EventRegister.emit(Events.POST_UPLOAD_FAILED);
  }
};

export const PostApi = {
  createPost,
};
