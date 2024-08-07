import { httpClient, requestHandler } from '@/api/http';
import { IBook, IBookDetail } from '@/models/book.model';
import { IPagination } from '@/models/pagination.model';

interface IFetchBooksParams {
  category?: number;
  new?: boolean;
  page?: number;
  limit: number;
}

export interface IFetchBooksResponse {
  books: IBook[];
  pagination: IPagination;
}

export const fetchBooks = async (
  params: IFetchBooksParams
): Promise<IFetchBooksResponse> => {
  try {
    const response = await httpClient.get<IFetchBooksResponse>('/books', {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        total: 0,
        current: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<IBookDetail>(`/books/${bookId}`);
  return response.data;
};

export const likeBook = async (bookId: number) => {
  const response = await httpClient.post(`/likes/${bookId}`);
  return response;
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);
  return response;
};

export const fetchBestBooks = async () => {
  return await requestHandler<IBook[]>('get', '/books/best');
};
