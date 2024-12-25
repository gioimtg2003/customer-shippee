import { SHA256 } from 'crypto-js';

export const createSha256 = (data: string) => {
  return SHA256(data + process.env.EXPO_PUBLIC_HASH_SECRET_KEY).toString();
};
