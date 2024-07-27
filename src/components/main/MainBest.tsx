import styled from 'styled-components';

import BookBestItem from '@/components/books/BookBestItem';
import { IBook } from '@/models/book.model';

interface IProps {
  books: IBook[];
}

function MainBest({ books }: IProps) {
  return (
    <MainBestStyle>
      {books.map((book, index) => (
        <BookBestItem key={book.id} book={book} rank={index + 1} />
      ))}
    </MainBestStyle>
  );
}

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainBest;
