import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { ILoginProps } from '@/pages/Login';
import { ISignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';

import { useAlert } from './useAlert';

export const useAuth = () => {
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const [resetRequested, setResetRequested] = useState(false);

  const userLogin = (data: ILoginProps) => {
    login(data)
      .then((response) => {
        storeLogin(response.token);

        showAlert('로그인을 완료했습니다.');
        navigate('/');
      })
      .catch(() => showAlert('로그인에 실패했습니다.'));
  };

  const userSignup = (data: ISignupProps) => {
    signup(data).then(() => {
      showAlert('회원가입을 완료했습니다.');
      navigate('/login');
    });
  };

  const userResetPassword = (data: ISignupProps) => {
    resetPassword(data).then(() => {
      showAlert('비밀번호를 초기화했습니다.');
      navigate('/login');
    });
  };

  const userResetRequest = (data: ISignupProps) => {
    resetRequest(data).then(() => {
      setResetRequested(true);
    });
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
