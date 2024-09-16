import { Chat, ChatMessage, Media, MessagingCredentials } from '@types';
import { StorageKeys } from '@globals/storageKeys';
import { SecureStore } from '@services/secureStore';
import { get, post } from './api.base';

const CONTROLLER_URL = 'message/';

const getRoute = (method: string) => {
  return CONTROLLER_URL + method;
};

const startSession = (): Promise<{ id: string; messagingKey: string }> => {
  const route = getRoute('start-session');
  const body = {};

  return post(route, body);
};

const getConversations = async (
  paginationToken?: string,
  count = 5
): Promise<Chat[]> => {
  const route = getRoute(
    `conversations?count=${count}${paginationToken ?? ''}`
  );

  const sessionId = await getMessagingSessionId();
  if (sessionId) {
    return get(route, true, undefined, sessionId as string);
  }
  throw Error;
};

const getUserConversation = async (
  userId: string,
  paginationToken?: string,
  count = 12
): Promise<ChatMessage[]> => {
  const route = getRoute(
    `${userId}/conversation?count=${count}${paginationToken ?? ''}`
  );

  const sessionId = await getMessagingSessionId();
  if (sessionId) {
    return get(route, true, undefined, sessionId as string);
  }
  throw Error;
};

const sendMessage = async (
  receiverUserId: string,
  text: string,
  media?: Media
): Promise<{ id: string }> => {
  const route = getRoute('send-message');

  const formData = new FormData();
  formData.append('receiverUserId', receiverUserId);
  if (text.length > 0) {
    formData.append('text', text);
  }
  if (media) {
    const file = {
      name: media.filename,
      type: media.mimeType,
      uri: media.url,
    };
    formData.append('image', file as any);
  }

  const sessionId = await getMessagingSessionId();
  if (sessionId) {
    return post(route, {}, true, formData, sessionId as string);
  }

  throw Error;
};

const messageTyping = async (
  receiverUserId: string
): Promise<{ id: string }> => {
  const route = getRoute('typing');
  const body = { receiverUserId };

  const sessionId = await getMessagingSessionId();
  if (sessionId) {
    return post(route, body, true, undefined, sessionId as string);
  }

  throw Error;
};

export const MessageApi = {
  startSession,
  getConversations,
  getUserConversation,
  sendMessage,
  messageTyping,
};

const startMessagingSession = async () => {
  try {
    const session = await MessageApi.startSession();
    const messagingCredentials: MessagingCredentials = {
      messagingKey: session.messagingKey,
      sessionId: session.id,
      sessionDate: new Date().toISOString(),
    };
    await SecureStore.setItem(
      StorageKeys.MESSAGING_CREDENTIALS,
      messagingCredentials,
      true
    );

    return session.id;
  } catch (e: any) {
    throw Error;
  }
};

const getMessagingSessionId = async () => {
  const messagingCredentials = (await SecureStore.getItem(
    StorageKeys.MESSAGING_CREDENTIALS,
    true
  )) as MessagingCredentials | undefined;

  if (messagingCredentials) {
    const now = new Date();

    if (
      now.getTime() - new Date(messagingCredentials.sessionDate).getTime() <
      15 * 60 * 1000
    ) {
      return messagingCredentials.sessionId;
    }
  }

  return startMessagingSession();
};
