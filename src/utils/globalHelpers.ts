import { StorageKeys } from '@globals';
import { ReactionStats } from '@types';
import { SecureStore } from '@services/secureStore';
import { MessagingKeyApi } from '@services/api/messagingKey.api';
import { cryptoHelpers } from './cryptoHelper';

const wait = (p_milliSeconds: number) =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise((p_resolve) => setTimeout(p_resolve, p_milliSeconds));

const getPaginationToken = (object: any | undefined) =>
  object
    ? `&paginationToken=${new Date(object.createdAt as string).getTime()}_${
        object.id
      }`
    : '';

const calculateReactionsCount = (object?: ReactionStats) =>
  object
    ? Object.values(object).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    : 0;

const onLoginRegisterKey = async () => {
  const response = cryptoHelpers.generateKeyPair();

  try {
    await MessagingKeyApi.registerMessagingKey(response.publicKey);
    await SecureStore.setItem(StorageKeys.PUBLIC_KEY, response.publicKey);
    await SecureStore.setItem(StorageKeys.PRIVATE_KEY, response.privateKey);
  } catch (e: any) {
    /* empty */
  }
};

export const globalHelpers = {
  wait,
  getPaginationToken,
  calculateReactionsCount,
  onLoginRegisterKey,
};
