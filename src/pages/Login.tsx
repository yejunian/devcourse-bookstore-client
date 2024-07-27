import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import Button from '@/components/common/Button';
import InputText from '@/components/common/InputText';
import Title from '@/components/common/Title';
import { useAuth } from '@/hooks/useAuth';
import { SignupStyle } from '@/pages/Signup';

export interface ILoginProps {
  email: string;
  password: string;
}

function Login() {
  const { userLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginProps>();

  const onSubmit = (data: ILoginProps) => {
    userLogin(data);
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
              inputMode="email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="error-text">이메일을 입력하세요.</p>}
          </fieldset>

          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              inputMode="text"
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
