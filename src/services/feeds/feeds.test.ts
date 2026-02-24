import { configureStore } from '@reduxjs/toolkit';
import { feedsSlice, initialState } from './slice';
import { getFeeds } from './actions';
import * as burgerAPI from '../../utils/burger-api';

describe('Тесты слайса [feeds]', () => {
  const store = configureStore({
    reducer: {
      feeds: feedsSlice.reducer
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
      const newState = feedsSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(initialState);
    });
  });

  describe('Проверка асинхронного экшена [getFeeds]', () => {
    test('Проверка получения заказов [getFeeds.fulfilled]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'getFeedsApi')
        .mockImplementation(() =>
          Promise.resolve({ ...expectedResult, success: true })
        );

      await store.dispatch(getFeeds());

      const state = store.getState().feeds;

      expect(state).toEqual({ ...expectedResult, currentOrder: null });
    });
  });

  describe('Проверка селекторов и редьюсеров [getFeeds]', () => {
    test('Проверка редьюсера для установки текущего заказа (невалидный номер) [setCurrentOrder]', () => {
      store.dispatch(feedsSlice.actions.setCurrentOrderFeed(0));

      const { currentOrder } = store.getState().feeds;

      expect(currentOrder).toBeNull();
    });

    test('Проверка редьюсера для установки текущего заказа (валидный номер) [setCurrentOrder]', () => {
      store.dispatch(feedsSlice.actions.setCurrentOrderFeed(101044));

      const { currentOrder } = store.getState().feeds;

      expect(currentOrder).toEqual(expectedResult.orders[3]);
    });

    test('Проверка селектора получения текущего заказа [selectCurrentOrder]', () => {
      expect(feedsSlice.selectors.selectCurrentOrder(store.getState())).toEqual(
        expectedResult.orders[3]
      );
    });

    test('Проверка селектора получения заказов (заказы есть в сторе) [selectOrders]', () => {
      expect(feedsSlice.selectors.selectFeeds(store.getState())).toEqual(
        expectedResult.orders
      );
    });

    test('Проверка селектора получения статистики заказов [selectFeedsStats]', () => {
      expect(feedsSlice.selectors.selectFeedsStats(store.getState())).toEqual({
        total: expectedResult.total,
        totalToday: expectedResult.totalToday
      });
    });

    test('Проверка редьюсера очистки заказов [clearFeeds]', () => {
      store.dispatch(feedsSlice.actions.clearFeeds());

      const state = store.getState().feeds;

      expect(state).toEqual({
        ...initialState,
        currentOrder: expectedResult.orders[3]
      });
    });

    test('Проверка селектора получения заказов (заказов нет в сторе) [selectOrders]', () => {
      expect(feedsSlice.selectors.selectFeeds(store.getState())).toEqual([]);
    });
  });
});
