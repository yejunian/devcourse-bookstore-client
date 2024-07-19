import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../constants/pagination';
import { QUERYSTRING } from '../constants/querystring';
import { Book } from '../models/book.model';
import { IPagination } from '../models/pagination.model';

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    current: 1,
    total: 0,
  });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    fetchBooks({
      category: params.get(QUERYSTRING.CATEGORY_ID)
        ? Number(params.get(QUERYSTRING.CATEGORY_ID))
        : undefined,
      new: params.get(QUERYSTRING.NEW) ? true : undefined,
      page: params.get(QUERYSTRING.PAGE)
        ? Number(params.get(QUERYSTRING.PAGE))
        : 1,
      limit: LIMIT,
    }).then(({ books, pagination }) => {
      setBooks(books);
      setPagination(pagination);
      setIsEmpty(books.length === 0);
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};
