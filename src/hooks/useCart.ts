import { useEffect, useState } from 'react';

import { deleteCart, fetchCart } from '../api/cart.api';
import { Cart } from '../models/cart.model';

export const useCart = () => {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    fetchCart().then((cart) => {
      setCart(cart.items);
      setIsEmpty(cart.items.length === 0);
    });
  }, []);

  const deleteCartItem = (bookId: number) => {
    deleteCart(bookId).then(() => {
      setCart(cart.filter((item) => item.bookId !== bookId));
    });
  };

  return { cart, isEmpty, deleteCartItem };
};
