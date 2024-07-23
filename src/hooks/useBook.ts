import { useEffect, useState } from 'react';

import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { addCart } from '../api/cart.api';
import { IBookDetail } from '../models/book.model';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';

export const useBook = (bookId: string | undefined) => {
  const { isLoggedIn } = useAuthStore();
  const showAlert = useAlert();

  const [book, setBook] = useState<IBookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    if (!bookId) {
      return;
    }

    fetchBook(bookId).then((book) => {
      setBook(book);
    });
  }, [bookId]);

  const toggleLike = () => {
    if (!isLoggedIn) {
      showAlert('로그인이 필요합니다.');
      return;
    }

    if (!book) {
      return;
    }

    if (book.userLiked) {
      unlikeBook(book.id).then(() => {
        setBook({
          ...book,
          userLiked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          userLiked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) {
      return;
    }

    addCart({
      bookId: book.id,
      quantity: quantity,
    })
      .then(() => {
        setCartAdded(true);

        setTimeout(() => {
          setCartAdded(false);
        }, 3000);
      })
      .catch(() => {
        showAlert('이미 장바구니에 담은 도서입니다.');
      });
  };

  return { book, toggleLike, addToCart, cartAdded };
};
