import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch, useDispatch } from '../../services/store';
import { logoutApi } from '@api';
import { logout, setIsRequestPending } from '../../services/user/slice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setIsRequestPending(true));
    logoutApi()
      .then(() => {
        dispatch(logout());
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .catch((err) => {
        alert('logout error' + err.message);
      })
      .finally(() => {
        dispatch(setIsRequestPending(false));
      });
    navigate(pathname);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
