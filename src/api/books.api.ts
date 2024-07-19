import { Book } from '../models/book.model';
import { IPagination } from '../models/pagination.model';
import { httpClient } from './http';

interface IFetchBooksParams {
  category?: number;
  new?: boolean;
  page?: number;
  limit: number;
}

interface IFetchBooksResponse {
  books: Book[];
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
