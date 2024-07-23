import { useEffect, useState } from 'react';

import { fetchOrder, fetchOrders } from '../api/order.api';
import { IOrderListItem } from '../models/order.model';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((item) => item.id === orderId)[0].detail) {
      setSelectedItemId(orderId);
      return;
    }

    fetchOrder(orderId).then((orderDetail) => {
      setSelectedItemId(orderId);
      setOrders(
        orders.map((item) => {
          if (item.id === orderId) {
            return {
              ...item,
              detail: orderDetail,
            };
          }
          return item;
        })
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
