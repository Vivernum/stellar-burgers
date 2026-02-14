import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/ingredients/actions';
import { ProtectedRoute } from '../protectedRoute/ProtectedRoute';
import { getUser } from '../../services/user/actions';
import { getCookie } from '../../utils/cookie';
import { setIsAuthChecked } from '../../services/user/slice';
import { selectIngredients } from '../../services/ingredients/slice';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;
  useEffect(() => {
    dispatch(getIngredients());
    getCookie('accessToken')
      ? dispatch(getUser())
      : dispatch(setIsAuthChecked());
  }, []);

  // честно, я не понимаю, почему оно работает, но вызов этого селектора решает проблему
  // я просто хотел проверить, что происходит со стором при перезагрузке, и вывел стейт
  // со списком игредиентов в консоль, но это сработало, поэтому вот -
  useSelector(selectIngredients);

  const handleCloseModal = () => {
    if (!background) navigate('/');
    else navigate(background.pathname);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={handleCloseModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={handleCloseModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='Детали заказа' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
