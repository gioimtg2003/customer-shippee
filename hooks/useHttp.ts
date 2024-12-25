import { http } from '@/config';
import { useMemo } from 'react';

export const useHttp = () => {
  const axios = useMemo(() => http.getInstance(), []);
  return axios;
};
