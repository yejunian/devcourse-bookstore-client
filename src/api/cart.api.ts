import { AxiosError } from 'axios';

import { Cart } from '../models/cart.model';
import { httpClient } from './http';

interface IAddCartParams {
  bookId: number;
  quantity: number;
}

interface IFetchCartResponseData {
  items: Cart[];
}

interface IFetchCartErrorData extends IFetchCartResponseData {
  reasons: string[];
}

export const addCart = async (params: IAddCartParams) => {
  const response = await httpClient.post('/cart', params);
  return response.data;
};

export const fetchCart = async () => {
  try {
    const response = await httpClient.get<IFetchCartResponseData>('/cart');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return error.response.data as IFetchCartErrorData;
    } else {
      throw error;
    }
  }
};

export const deleteCart = async (bookId: number) => {
  const response = await httpClient.delete(`/cart/${bookId}`);
  return response.data;
};
