import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

import { IBookReviewItem } from '@/models/book.model';
import { formatDate } from '@/utils/format';

interface IProps {
  review: IBookReviewItem;
}

function Star(props: Pick<IBookReviewItem, 'score'>) {
  return (
    <span className="star">
      {Array.from({ length: props.score }, (_, index) => (
        <FaStar key={index} />
      ))}
    </span>
  );
}

function BookReviewItem({ review }: IProps) {
  return (
    <BookReviewItemStyle>
      <header className="review-header">
        <div>
          <span>{review.username}</span>
          <span>{<Star score={review.score} />}</span>
        </div>

        <div>{formatDate(review.createdAt)}</div>
      </header>

      <div className="content">
        <p>{review.content}</p>
      </div>
    </BookReviewItemStyle>
  );
}

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.secondary};
    padding: 0;

    .star {
      padding: 0 0 0 8px;

      svg {
        fill: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .content {
    p {
      font-size: 1rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

export default BookReviewItem;
