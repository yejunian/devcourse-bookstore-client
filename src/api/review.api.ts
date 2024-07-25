import { requestHandler } from '@/api/http';
import { IBookReviewItem, TBookReviewItemWrite } from '@/models/book.model';

interface IAddBookReviewResponse {
  message: string;
}

export const fetchBookReview = async (bookId: string) => {
  return await requestHandler<IBookReviewItem[]>('get', `/reviews/${bookId}`);
};

export const addBookReview = async (
  bookId: string,
  data: TBookReviewItemWrite
) => {
  return await requestHandler<IAddBookReviewResponse>(
    'post',
    `/reviews/${bookId}`,
    data
  );
};
