import { ISignupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: ISignupProps) => {
  const response = await httpClient.post('/users', userData);
  return response.data;
};
