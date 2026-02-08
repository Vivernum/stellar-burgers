import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { AppDispatch, useDispatch } from '../../services/store';
import { registerUserApi } from '@api';
import * as slice from '../../services/user/slice';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(slice.setIsRequestPending(true));
    registerUserApi({ name: userName, email, password })
      .then((res) => {
        dispatch(slice.setUser(res.user));
        setCookie('access_token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
      .catch((err) => alert('register error' + err.message))
      .finally(() => {
        dispatch(slice.setIsRequestPending(false));
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
