import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch, useDispatch } from '../../services/store';
import { logoutUser } from '../../services/user/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(pathname);
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
