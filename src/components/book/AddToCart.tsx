import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useBook } from '../../hooks/useBook';
import { IBookDetail } from '../../models/book.model';
import Button from '../common/Button';
import InputText from '../common/InputText';

interface IProps {
  book: IBookDetail;
}

function AddToCart({ book }: IProps) {
  const { addToCart, cartAdded } = useBook(book?.id?.toString());

  const [quantity, setQuantity] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity(quantity - 1);
  };

  return (
    <AddToCartStyle $added={cartAdded}>
      <div>
        <InputText
          inputType="number"
          value={quantity}
          onChange={handleChange}
        />
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>

      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToCart(quantity)}
      >
        장바구니 담기
      </Button>

      <div className="added">
        <p>장바구니에 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
}

interface IAddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<IAddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: all 0.5s ease;

    p {
      margin: 0;
      padding: 0 0 8px 0;
    }
  }
`;

export default AddToCart;
