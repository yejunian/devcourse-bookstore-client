import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

import { fetchBooks, IFetchBooksResponse } from '@/api/books.api';
import { LIMIT } from '@/constants/pagination';
import { QUERYSTRING } from '@/constants/querystring';

export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: { pageParam: number }) => {
    const params = new URLSearchParams(location.search);

    return fetchBooks({
      category: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      new: params.get(QUERYSTRING.NEW) ? true : undefined,
      limit: LIMIT,
      page: pageParam,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['books', location.search],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getBooks({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: IFetchBooksResponse) => {
      const isLastPage =
        Math.ceil(lastPage.pagination.total / LIMIT) ===
        lastPage.pagination.current;

      return isLastPage ? null : lastPage.pagination.current + 1;
    },
  });

  const books = data?.pages.flatMap((page) => page.books) ?? [];
  const pagination = data?.pages[data.pages.length - 1].pagination ?? {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
