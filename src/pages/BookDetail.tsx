import { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AddToCart from '../components/book/AddToCart';
import LikeButton from '../components/book/LikeButton';
import EllipsisBox from '../components/common/EllipsisBox';
import Title from '../components/common/Title';
import { useBook } from '../hooks/useBook';
import { IBookDetail } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';

const bookInfoList: {
  label: string;
  key: keyof IBookDetail;
  filter?: (book: IBookDetail) => ReactNode;
}[] = [
  {
    label: '카테고리',
    key: 'category',
    filter: (book: IBookDetail) => (
      <Link to={`/books?category_id=${book.category}`}>{book.category}</Link>
    ),
  },
  {
    label: '포맷',
    key: 'form',
  },
  {
    label: '페이지',
    key: 'pages',
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pubDate',
    filter: (book: IBookDetail) => formatDate(book.pubDate),
  },
  {
    label: '가격',
    key: 'price',
    filter: (book: IBookDetail) => `${formatNumber(book.price)}원`,
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book, toggleLike } = useBook(bookId);

  if (!book) {
    return null;
  }

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img">
          <img src={book.images[0]} alt={book.title} />
        </div>

        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>

          {bookInfoList.map((info) => (
            <dl key={info.key}>
              <dt>{info.label}</dt>
              <dd>{info.filter ? info.filter(book) : book[info.key]}</dd>
            </dl>
          ))}

          <p className="summary">{book.excerpt}</p>

          <div className="like">
            <LikeButton book={book} onClick={toggleLike} />
          </div>

          <div className="add-cart">
            <AddToCart book={book} />
          </div>
        </div>
      </header>

      <div className="content">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox linelimit={4}>{book.content}</EllipsisBox>

        <Title size="medium">목차</Title>
        <p className="index">{book.toc}</p>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;

      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;

        dt {
          width: 80px;
          color: ${({ theme }) => theme.color.secondary};
        }

        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }

  .content {
  }
`;

export default BookDetail;
