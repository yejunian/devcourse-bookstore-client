import { ISignupProps } from '../pages/Signup';
import { httpClient } from './http';

interface ILoginResponse {
  token: string;
}

export const signup = async (userData: ISignupProps) => {
  const response = await httpClient.post('/users', userData);
  return response.data;
};

export const resetRequest = async (data: ISignupProps) => {
  const response = await httpClient.post('/auth/reset-token', data);
  return response.data;
};

export const resetPassword = async (data: ISignupProps) => {
  const response = await httpClient.put('/users', data);
  return response.data;
};

export const login = async (data: ISignupProps) => {
  const response = await httpClient.post<ILoginResponse>('/auth/token', data);
  return response.data;
};
