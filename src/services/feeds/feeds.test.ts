import { AsyncThunkAction, configureStore } from '@reduxjs/toolkit';
import { feedsSlice } from './slice';
import * as fakeAPI from './actions';
import { json } from 'stream/consumers';

// describe('bullshit tests', () => {
//   test('bullshit', async () => {
//     const mock = jest
//       .spyOn(someAPI, 'fakeAPI')
//       .mockImplementation(() => Promise.resolve({ success: true }));

//     const result = await someAPI.fakeAPI();

//     expect(result).toEqual({
//       success: true
//     });
//   });
// });

describe('Тесты слайса [feeds]', () => {
  const initialFeedsState = {
    orders: [],
    total: 0,
    totalToday: 0,
    currentOrder: null
  };

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

  describe('Проверка асинхронного экшена [getFeeds]', () => {
    test('Проверка получения заказов [getFeeds.fulfilled]', async () => {
      const mock = jest.spyOn(fakeAPI, 'getFeeds').mockImplementation();

      await store.dispatch(fakeAPI.getFeeds());

      const state = store.getState().feeds;

      expect(state).toEqual({ ...expectedResult, currentOrder: null });
    });
  });
});
