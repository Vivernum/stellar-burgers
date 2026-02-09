import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectPendingStatus,
  selectUser
} from '../../services/user/slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const isPending = useSelector(selectPendingStatus);
  const location = useLocation();

  if (!isAuthChecked || isPending) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace state={location.pathname} to='/login' />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return children;
};
