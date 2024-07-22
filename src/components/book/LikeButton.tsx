import { FaHeart } from 'react-icons/fa';
import styled from 'styled-components';

import { IBookDetail } from '../../models/book.model';
import Button from '../common/Button';

interface IProps {
  book: IBookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: IProps) {
  return (
    <LikeButtonStyle
      size="medium"
      scheme={book.userLiked ? 'like' : 'normal'}
      onClick={onClick}
    >
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;

    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
