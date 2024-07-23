import { IOrder, IOrderDetailItem, IOrderSheet } from '../models/order.model';
import { httpClient } from './http';

interface IFetchOrdersResponseData {
  orders: IOrder[];
}

interface IFetchOrderResponseData {
  items: IOrderDetailItem[];
}

// TODO: API 수정 필요 (서버 쪽 구현 변경)
export const order = async (orderData: IOrderSheet) => {
  const response = await httpClient.post('/orders', orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<IFetchOrdersResponseData>('/orders');
  return response.data.orders;
};

export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<IFetchOrderResponseData>(
    `/orders/${orderId}`
  );
  return response.data.items;
};
