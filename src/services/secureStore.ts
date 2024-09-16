import * as ExpoSecureStore from 'expo-secure-store';
import { StorageKeys } from '@globals';

const getItem = async (key: StorageKeys, obj?: boolean): Promise<any> => {
  const itemString = await ExpoSecureStore.getItemAsync(key);
  if (itemString && obj) {
    const parsedItem = JSON.parse(itemString);

    return parsedItem;
  }

  return itemString;
};

const setItem = async (
  key: StorageKeys,
  value: unknown,
  obj?: boolean
): Promise<void> => {
  let setValue = '';

  if (obj) {
    setValue = JSON.stringify(value);
  } else {
    setValue = value as string;
  }

  await ExpoSecureStore.setItemAsync(key, setValue);
};

const deleteItem = async (key: StorageKeys): Promise<void> => {
  await ExpoSecureStore.deleteItemAsync(key);
};

export const SecureStore = {
  getItem,
  setItem,
  deleteItem,
};
