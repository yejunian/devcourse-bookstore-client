import { useMemo, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import Empty from '../components/common/Empty';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';
import { useCart } from '../hooks/useCart';
import { IOrderSheet } from '../models/order.model';

function Cart() {
  const navigate = useNavigate();

  const { showAlert, showConfirm } = useAlert();
  const { cart, isEmpty, deleteCartItem } = useCart();

  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const totalQuantity = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          checkedItems.includes(item.bookId) ? acc + item.count : acc,
        0
      ),
    [cart, checkedItems]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (acc, item) =>
          checkedItems.includes(item.bookId)
            ? acc + item.price * item.count
            : acc,
        0
      ),
    [cart, checkedItems]
  );

  const handleItemCheck = (bookId: number) => {
    if (checkedItems.includes(bookId)) {
      setCheckedItems(checkedItems.filter((item) => item !== bookId));
    } else {
      setCheckedItems([...checkedItems, bookId]);
    }
  };

  const handleItemDelete = (bookId: number) => {
    deleteCartItem(bookId);
  };

  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택하세요.');
      return;
    }

    const orderData: Omit<IOrderSheet, 'delivery'> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle:
        cart.find((item) => item.bookId === checkedItems[0])?.title || '',
    };

    showConfirm('주문할까요?', () => {
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <Title size="large">장바구니</Title>

      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {cart.map((item) => (
                <CartItem
                  key={item.bookId}
                  cart={item}
                  checkedItems={checkedItems}
                  onCheck={handleItemCheck}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>

            <div className="summary">
              <CartSummary
                totalQuantity={totalQuantity}
                totalPrice={totalPrice}
              />

              <Button size="large" scheme="primary" onClick={handleOrder}>
                주문하기
              </Button>
            </div>
          </>
        )}

        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다."
            icon={<FaShoppingCart />}
            description="장바구니를 채워 보세요."
          />
        )}
      </CartStyle>
    </>
  );
}

export const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }

    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }

      .input {
        flex: 1;

        input {
          width: 100%;
        }
      }
    }

    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;

export default Cart;
