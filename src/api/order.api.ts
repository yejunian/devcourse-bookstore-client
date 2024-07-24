import { requestHandler } from '@/api/http';
import { IOrder, IOrderDetailItem, IOrderSheet } from '@/models/order.model';

interface IFetchOrdersResponseData {
  orders: IOrder[];
}

interface IFetchOrderResponseData {
  items: IOrderDetailItem[];
}

// TODO: API 수정 필요 (서버 쪽 구현 변경)
export const order = async (orderData: IOrderSheet) => {
  return await requestHandler('post', '/orders', orderData);
};

export const fetchOrders = async () => {
  return (await requestHandler<IFetchOrdersResponseData>('get', '/orders'))
    .orders;
};

export const fetchOrder = async (orderId: number) => {
  return (
    await requestHandler<IFetchOrderResponseData>('get', `/orders/${orderId}`)
  ).items;
};
