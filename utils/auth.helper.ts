import { StorageKey } from '@/constants';
import { IResponseLogin } from '@/interfaces';
import { removeStorageByKey, setStorageByKey } from './storage.helper';

export const setAuth = async (data: IResponseLogin) => {
  setStorageByKey(StorageKey.TOKEN, {
    value: data.accessToken,
  });
  setStorageByKey(StorageKey.EXP, {
    value: data.expiresIn,
  });
  setStorageByKey(StorageKey.REFRESH_TOKEN, {
    value: data.refreshToken,
  });
};

export const removeAuth = async () => {
  await removeStorageByKey(StorageKey.TOKEN);
  await removeStorageByKey(StorageKey.EXP);
  await removeStorageByKey(StorageKey.REFRESH_TOKEN);
};
