import { StorageKey } from '@/constants';
import { IResponseData, IResponseLogin } from '@/interfaces';
import { getStorageByKey, removeAuth, setAuth } from '@/utils';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { appConfig } from './app.config';

const config = appConfig();

export const http = (function () {
  let instance: AxiosInstance;

  function createInstance() {
    const axiosInstance = axios.create({
      baseURL: config.apiUrl || '',
      withCredentials: true,
      timeout: 10000,
    });

    axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const accessToken = await getStorageByKey(StorageKey.TOKEN);
          config.headers['Authorization'] = `Bearer ${accessToken?.value}`;
        } catch {
          throw new Error('Failed to get token');
        }

        return { ...config };
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originRequest = error.config;
        if (!error.response || !originRequest)
          throw new Error('Request failed');

        const errorCode =
          error.response && error.response.data
            ? (error.response.data as any).statusCode
            : null;

        const msg = (error.response.data as any).message;
        try {
          if (
            error.response.status === 401 &&
            errorCode === 401 &&
            msg === 'Invalid token'
          ) {
            const newToken = await refreshToken();
            originRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axios.request(originRequest);
          }
        } catch (error) {
          console.log('error in error requests', error);
          await removeAuth();
        }

        return Promise.reject(error);
      }
    );
    return axiosInstance;
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    addAuthToken: function (token: string) {
      const ins = this.getInstance();
      ins.defaults.headers['Authorization'] = `Bearer ${token}`;
      return ins;
    },
  };
})();

const refreshToken = async () => {
  try {
    const refreshToken = await getStorageByKey(StorageKey.REFRESH_TOKEN);

    let data = await http
      .getInstance()
      .post<
        IResponseData<IResponseLogin>
      >(`${config.apiUrl}/driver-auth/refresh-token`, {
        token: refreshToken?.value,
      });
    console.log('refreshToken', data.data.data);
    setAuth(data.data.data);

    return data.data.data.accessToken;
  } catch {
    throw new Error('Refresh token failed');
  }
};
