import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
type User = {
  access: string;
  refresh: string;
} | null;
//eslint-disable-next-line
export const userAtom = atomWithStorage<User>('user', null);
export const meAtom = atom<any>(null);
export const regAtom = atom<any>(null);
