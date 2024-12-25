import { StorageKey } from '@/constants';
import { ILocalStorageValue } from '@/interfaces';
import { getStorageByKey, setStorageByKey } from '@/utils/storage.helper';
import { useEffect, useState } from 'react';

export const useStorage = (key: StorageKey) => {
  const [storageValue, setValue] = useState<ILocalStorageValue | null>(null);

  useEffect(() => {
    (async () => {
      const item = await getStorageByKey(key);
      setValue(item);
    })();
  }, [key]);

  const setStorageValue = async (value: ILocalStorageValue) => {
    console.log('setStorageValue', value);
    setValue(value);
    setStorageByKey(key, value);
  };

  return { storageValue, setStorageValue };
};
