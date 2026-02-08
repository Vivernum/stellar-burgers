import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBurgerConstructor
} from '../../services/burger-constructor/slice';
import {
  closeModal,
  selectOrderModalData,
  selectOrderRequest,
  setOrderRequest,
  setOrders
} from '../../services/order/slice';
import { selectUser } from '../../services/user/slice';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);
  const user = useSelector(selectUser);

  const order: string[] = [];

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    order.push(constructorItems.bun._id);
    constructorItems.ingredients.forEach((item: TIngredient) => {
      order.push(item._id);
    });

    dispatch(setOrderRequest(true));
    orderBurgerApi(order)
      .then((res) => {
        dispatch(setOrders(res.order));
        dispatch(clearConstructor());
      })
      .finally(() => {
        dispatch(setOrderRequest(false));
      });
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
