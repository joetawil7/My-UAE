import { UserInfo } from '@types';
import { atom } from 'jotai';

export const authenticatedUserAtom = atom<UserInfo | undefined>(undefined);
export const loadingOverlayAtom = atom<boolean>(false);
export const profileRefreshing = atom<boolean>(false);
