import styled from 'styled-components';

import BookItem, { BookItemStyle } from '@/components/books/BookItem';
import { IBook } from '@/models/book.model';

interface IProps {
  book: IBook;
  rank: number;
}

function BookBestItem({ book, rank }: IProps) {
  return (
    <BookBestItemStyle>
      <BookItem book={book} view="grid" />
      <div className="rank">{rank}</div>
    </BookBestItemStyle>
  );
}

const BookBestItemStyle = styled.div`
  position: relative;

  ${BookItemStyle} {
    .summary,
    .price,
    .likes {
      display: none;
    }
  }

  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rank {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.color.primary};
    border-radius: 512px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }
`;

export default BookBestItem;
