import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { order } from '../api/order.api';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import FindAddressButton from '../components/order/FindAddressButton';
import { useAlert } from '../hooks/useAlert';
import { IDelivery, IOrderSheet } from '../models/order.model';
import { CartStyle } from './Cart';

interface IDeliveryForm extends IDelivery {
  addressDetail: string;
}

function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDataFromCart = location.state as Omit<IOrderSheet, 'delivery'>;
  const { totalQuantity, totalPrice, firstBookTitle } = orderDataFromCart;

  const { showAlert, showConfirm } = useAlert();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IDeliveryForm>();

  const handlePay = (data: IDeliveryForm) => {
    const orderData: IOrderSheet = {
      ...orderDataFromCart,
      delivery: {
        ...data,
        address: `${data.address} ${data.addressDetail}`,
      },
    };

    showConfirm('주문을 진행할까요?', () => {
      order(orderData).then(() => {
        showAlert('주문을 처리했습니다.');
        navigate('/orderlist');
      });
    });
  };

  const handleFindAddress = (address: string) => {
    setValue('address', address);
  };

  return (
    <>
      <Title size="large">주문서 작성</Title>

      <CartStyle>
        <div className="content">
          <div className="order-info">
            <Title size="medium" color="text">
              배송 정보
            </Title>

            <form className="delivery">
              <fieldset>
                <label>주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('address', { required: true })}
                  />
                </div>
                <FindAddressButton onCompleted={handleFindAddress} />
              </fieldset>
              {errors.address && (
                <p className="error-text">주소를 입력하세요.</p>
              )}

              <fieldset>
                <label>상세 주소</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('addressDetail', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.addressDetail && (
                <p className="error-text">상세 주소를 입력하세요.</p>
              )}

              <fieldset>
                <label>수령인</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('receiver', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.receiver && (
                <p className="error-text">수령인 이름을 입력하세요.</p>
              )}

              <fieldset>
                <label>전화번호</label>
                <div className="input">
                  <InputText
                    inputType="text"
                    {...register('contact', { required: true })}
                  />
                </div>
              </fieldset>
              {errors.contact && (
                <p className="error-text">전화번호를 입력하세요.</p>
              )}
            </form>
          </div>

          <div className="order-info">
            <Title size="medium" color="text">
              주문 상품
            </Title>

            <strong>
              {firstBookTitle} 등 총 {totalQuantity}권
            </strong>
          </div>
        </div>

        <div className="summary">
          <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />

          <Button
            size="large"
            scheme="primary"
            onClick={handleSubmit(handlePay)}
          >
            결제하기
          </Button>
        </div>
      </CartStyle>
    </>
  );
}

export default Order;
