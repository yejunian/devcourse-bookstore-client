import { useMemo } from 'react';
import styled from 'styled-components';

import { useAlert } from '../../hooks/useAlert';
import { Cart } from '../../models/cart.model';
import { formatNumber } from '../../utils/format';
import Button from '../common/Button';
import Title from '../common/Title';
import CheckIconButton from './CheckIconButton';

interface IProps {
  cart: Cart;
  checkedItems: number[];
  onCheck: (bookId: number) => void;
  onDelete: (bookId: number) => void;
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: IProps) {
  const { showConfirm } = useAlert();

  const isChecked = useMemo(
    () => checkedItems.includes(cart.bookId),
    [cart.bookId, checkedItems]
  );

  const handleCheck = () => {
    onCheck(cart.bookId);
  };

  const handleDelete = () => {
    showConfirm('정말 삭제할까요?', () => {
      onDelete(cart.bookId);
    });
  };

  return (
    <CartItemStyle>
      <div className="info">
        <div className="check">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size="medium" color="text">
            {cart.title}
          </Title>
          <p className="summary">{cart.excerpt}</p>
          <p className="price">{formatNumber(cart.price)}원</p>
          <p className="quantity">{cart.count}권</p>
        </div>
      </div>

      <Button size="medium" scheme="normal" onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </CartItemStyle>
  );
}

const CartItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;

  .info {
    display: flex;
    align-items: start;
    flex: 1;

    .check {
      width: 40px;
      flex-shrink: 0;
    }

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default CartItem;
