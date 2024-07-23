import React from 'react';
import styled from 'styled-components';

import Button from '../components/common/Button';
import Title from '../components/common/Title';
import { useOrders } from '../hooks/useOrders';
import { formatDate, formatNumber } from '../utils/format';

function OrderList() {
  const { orders, selectedItemId, selectOrderItem } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>

      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표 상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt, 'YYYY. M. D.')}</td>
                  <td>{order.receiver.address}</td>
                  <td>{order.receiver.name}</td>
                  <td>{order.receiver.phone}</td>
                  <td>{order.items.firstTitle}</td>
                  <td>{order.items.totalQuantity}권</td>
                  <td>{formatNumber(order.payment.amount)}원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.id)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>

                {selectedItemId === order.id && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order.detail?.map((item) => (
                          <li key={item.bookId}>
                            <div>
                              <span>{item.title}</span>
                              <span>{formatNumber(item.unitPrice)}원</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
}

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;

  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }

    .detail {
      margin: 0;

      li {
        list-style: square;
        text-align: left;

        div {
          display: flex;
          padding: 8px 12px;
          gap: 8px;
        }
      }
    }
  }
`;

export default OrderList;
