import { StorageKey } from '@/constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const setCookies = async (cookies: Record<string, string>) => {
  try {
    const JSON_VALUE = JSON.stringify(cookies);
    await AsyncStorage.setItem(StorageKey.TOKEN, JSON_VALUE);
  } catch (e) {
    console.error(e);
  }
};

export const setStorageByKey = async <T>(key: StorageKey, value: T) => {
  try {
    const JSON_VALUE = JSON.stringify(value);
    await AsyncStorage.setItem(key, JSON_VALUE);
  } catch (e) {
    console.error(e);
  }
};
export const getStorageByKey = async (key: StorageKey) => {
  try {
    const JSON_VALUE = await AsyncStorage.getItem(key);
    return JSON_VALUE != null ? JSON.parse(JSON_VALUE) : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export const removeStorageByKey = async (key: StorageKey) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
