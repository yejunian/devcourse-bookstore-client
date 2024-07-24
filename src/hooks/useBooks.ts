import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../constants/pagination';
import { QUERYSTRING } from '../constants/querystring';

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ['books', location.search],
    queryFn: () =>
      fetchBooks({
        category: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        new: params.get(QUERYSTRING.NEW) ? true : undefined,
        page: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      }),
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books?.length === 0,
    isBooksLoading,
  };
};
