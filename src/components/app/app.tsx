import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppDispatch, useDispatch } from '../../services/store';
import { getIngredients } from '../../services/ingredients/actions';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = location.state?.background;
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleCloseModal = () => {
    if (!background) navigate('/');
    else navigate(background.pathname);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
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
      </Routes>
    </div>
  );
};

export default App;
