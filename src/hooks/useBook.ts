import { useEffect, useState } from 'react';

import { fetchBook, likeBook, unlikeBook } from '@/api/books.api';
import { addCart } from '@/api/cart.api';
import { addBookReview, fetchBookReview } from '@/api/review.api';
import { useAlert } from '@/hooks/useAlert';
import { useToast } from '@/hooks/useToast';
import {
  IBookDetail,
  IBookReviewItem,
  TBookReviewItemWrite,
} from '@/models/book.model';
import { useAuthStore } from '@/store/authStore';

export const useBook = (bookId: string | undefined) => {
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const { showToast } = useToast();

  const [book, setBook] = useState<IBookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);

  const [reviews, setReviews] = useState<IBookReviewItem[]>([]);

  useEffect(() => {
    if (!bookId) {
      return;
    }

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
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
      showToast('좋아요를 취소했습니다.');
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          userLiked: true,
          likes: book.likes + 1,
        });
      });
      showToast('이 도서를 좋아합니다.');
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

  const addReview = (data: TBookReviewItemWrite) => {
    if (!book) {
      return;
    }

    addBookReview(book.id.toString(), data).then((response) => {
      fetchBookReview(book.id.toString()).then((reviews) => {
        setReviews(reviews);
      });

      showAlert(response.message);
    });
  };

  return { book, toggleLike, addToCart, cartAdded, reviews, addReview };
};
