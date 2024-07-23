import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from '../../constants/querystring';
import { IBook } from '../../models/book.model';
import BookItem from './BookItem';
import { TViewMode } from './BooksViewSwitcher';

interface IProps {
  books: IBook[];
}

function BooksList({ books }: IProps) {
  const location = useLocation();

  const [view, setView] = useState<TViewMode>('grid');

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as TViewMode);
    }
  }, [location.search]);

  return (
    <BooksListStyle $view={view}>
      {books.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </BooksListStyle>
  );
}

interface IBooksListStyleProps {
  $view: TViewMode;
}

const BooksListStyle = styled.div<IBooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ $view }) =>
    $view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'};
  gap: 24px;
`;

export default BooksList;
