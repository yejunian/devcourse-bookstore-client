import axios, { AxiosRequestConfig } from 'axios';

import { getToken, removeToken } from '@/store/authStore';

type TRequestMethod = 'get' | 'post' | 'put' | 'delete';

const BASE_URL = 'http://localhost:3000';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const token = getToken();

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `bearer ${token}` : '',
    },
    withCredentials: true,
    ...config,
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        removeToken();
        window.location.href = '/login';
        return;
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const httpClient = createClient();

export const requestHandler = async <R = any, P = any>(
  method: TRequestMethod,
  url: string,
  payload?: P
) => {
  let response;

  switch (method) {
    case 'post':
      response = await httpClient.post<R>(url, payload);
      break;

    case 'get':
      response = await httpClient.get<R>(url);
      break;

    case 'put':
      response = await httpClient.put<R>(url, payload);
      break;

    case 'delete':
      response = await httpClient.delete<R>(url);
      break;
  }

  return response.data;
};
