import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { login, signup } from '../api/auth.api';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';
import { useAuthStore } from '../store/authStore';
import { SignupStyle } from './Signup';

export interface ILoginProps {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { isLoggedIn, storeLogin } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginProps>();

  const onSubmit = async (data: ILoginProps) => {
    try {
      const response = await login(data);

      storeLogin(response.token);

      showAlert('로그인을 완료했습니다.');
      navigate('/');
    } catch (error) {
      showAlert('로그인에 실패했습니다.');
    }
  };

  return (
    <>
      <Title size="large">로그인</Title>

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

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
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

export default Login;
