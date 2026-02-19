import { configureStore } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  closeModal,
  orderSlice,
  selectOrderByNumber,
  selectOrderModalData,
  selectOrderRequest,
  selectOrders,
  setOrderRequest,
  setOrders
} from './slice';
import * as burgerAPI from '../../utils/burger-api';
import { getOrders, getOrderByNumber } from './actions';

describe('Тесты слайса [order]', () => {
  type TInitialOrderState = {
    orderRequest: boolean;
    orders: TOrder[] | null;
    orderModalData: TOrder | null;
    ordersByNumber: TOrder | null;
  };

  const initialOrderState: TInitialOrderState = {
    orderRequest: false,
    orders: null,
    orderModalData: null,
    ordersByNumber: null
  };

  const store = configureStore({
    reducer: {
      order: orderSlice.reducer
    }
  });

  const expectedResult = {
    orders: [
      {
        _id: '699302daa64177001b32c221',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Био-марсианский флюоресцентный бургер',
        createdAt: '2026-02-16T11:43:22.768Z',
        updatedAt: '2026-02-16T11:43:22.959Z',
        number: 101047
      },
      {
        _id: '69930222a64177001b32c21f',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Био-марсианский флюоресцентный бургер',
        createdAt: '2026-02-16T11:40:18.774Z',
        updatedAt: '2026-02-16T11:40:18.977Z',
        number: 101046
      },
      {
        _id: '699301d9a64177001b32c21d',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Традиционный-галактический флюоресцентный бургер',
        createdAt: '2026-02-16T11:39:05.553Z',
        updatedAt: '2026-02-16T11:39:05.840Z',
        number: 101045
      },
      {
        _id: '6993001aa64177001b32c21b',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Традиционный-галактический флюоресцентный бургер',
        createdAt: '2026-02-16T11:31:38.938Z',
        updatedAt: '2026-02-16T11:31:39.150Z',
        number: 101044
      }
    ],
    total: 4,
    totalToday: 6
  };

  describe('Проверка настройки редьюсера [feeds]', () => {
    test('Редюсер должен вернуть начальное состояние при получении неизвестного экшена', () => {
      const newState = orderSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(initialOrderState);
    });
  });

  describe('Проверка асинхронных экшенов [orders]', () => {
    test('Проверка экшена получения заказов [getOrders]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'getOrdersApi')
        .mockImplementation(() => Promise.resolve([...expectedResult.orders]));

      await store.dispatch(getOrders());

      const state = store.getState().order.orders;

      expect(state).toEqual([...expectedResult.orders]);
    });

    test('Проверка экшена получения заказа по номеру [getOrdersByNumber]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'getOrderByNumberApi')
        .mockImplementation(() =>
          Promise.resolve({
            orders: [expectedResult.orders[0]],
            success: true
          })
        );

      await store.dispatch(getOrderByNumber(101047));

      const state = store.getState().order.ordersByNumber;

      expect(state).toEqual(expectedResult.orders[0]);
    });
  });

  describe('Проверка редьюсеров [order]', () => {
    test('Проверка редьюсера, отвечающего за статус заказа [setOrderRequest] - true', () => {
      store.dispatch(setOrderRequest(true));

      expect(store.getState().order.orderRequest).toBe(true);
    });

    test('Проверка редьюсера, отвечающего за статус заказа [setOrderRequest] - false', () => {
      store.dispatch(setOrderRequest(false));

      expect(store.getState().order.orderRequest).toBe(false);
    });

    test('Проверка редьюсера, отвечающего за данные модального окна [setOrders]', () => {
      store.dispatch(setOrders(expectedResult.orders[0]));

      expect(store.getState().order.orderModalData).toEqual(
        expectedResult.orders[0]
      );
    });

    test('Проверка редьюсера, отвечающего за скрытие модального окна [closeModal', () => {
      store.dispatch(closeModal());

      expect(store.getState().order.orderModalData).toBe(null);
      expect(store.getState().order.orderRequest).toBe(false);
    });
  });

  describe('Проверка селекторов [order]', () => {
    test('Проверка селектора получения заказов [selectOrders]', () => {
      expect(store.getState().order.orders).toEqual(
        selectOrders(store.getState())
      );
    });

    test('Проверка селектора получения заказа по номеру [selectOrdersByNumber]', () => {
      expect(store.getState().order.ordersByNumber).toEqual(
        selectOrderByNumber(store.getState())
      );
    });

    test('Проверка селектора получения статуса заказа [selectOrderRequest]', () => {
      expect(selectOrderRequest(store.getState())).toBe(false);

      store.dispatch(setOrderRequest(true));

      expect(selectOrderRequest(store.getState())).toBe(true);
    });

    test('Проверка селектора получения данныйх модального окна [selectOrderModalData]', () => {
      expect(selectOrderModalData(store.getState())).toBe(null);

      store.dispatch(setOrders(expectedResult.orders[0]));

      expect(selectOrderModalData(store.getState())).toEqual(
        expectedResult.orders[0]
      );
    });
  });
});
