import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { AppDispatch, useDispatch } from '../../services/store';
import { loginUserApi } from '@api';
import { setIsRequestPending, setUser } from '../../services/user/slice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setIsRequestPending(true));
    loginUserApi({ email, password })
      .then((res) => {
        dispatch(setUser(res.user));
        setCookie('access_token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((err) => {
        alert('login error' + err.message);
      })
      .finally(() => {
        dispatch(setIsRequestPending(false));
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
