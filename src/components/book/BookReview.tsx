import styled from 'styled-components';

import BookReviewAdd from '@/components/book/BookReviewAdd';
import BookReviewItem from '@/components/book/BookReviewItem';
import { IBookReviewItem, TBookReviewItemWrite } from '@/models/book.model';

interface IProps {
  reviews: IBookReviewItem[];
  onAdd: (data: TBookReviewItemWrite) => void;
}

function BookReview({ reviews, onAdd }: IProps) {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />

      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReview;
