import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { resetPassword, resetRequest, signup } from '../api/auth.api';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';
import { SignupStyle } from './Signup';

export interface IResetPassword {
  email: string;
  password: string;
}

function ResetPassword() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const [resetRequested, setResetRequested] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassword>();

  const onSubmit = async (data: IResetPassword) => {
    if (resetRequested) {
      await resetPassword(data);
      showAlert('비밀번호를 초기화했습니다.');
      navigate('/login');
    } else {
      await resetRequest(data);
      setResetRequested(true);
    }
    // await signup(data);

    // showAlert('회원가입을 완료했습니다.');
    // navigate('/login');
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>

      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="error-text">이메일을 입력하세요.</p>}
          </fieldset>

          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호를 입력하세요.</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? '비밀번호 초기화' : '초기화 요청'}
            </Button>
          </fieldset>

          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
}

export default ResetPassword;
