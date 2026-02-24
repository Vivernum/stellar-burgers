import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice, initialState } from './slice';
import * as burgerAPI from '../../utils/burger-api';
import { getIngredients } from './actions';

describe('Тесты слайса [ingredients]', () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer
    }
  });

  const expectedResult = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    }
  ];

  describe('Проверка настройки редьюсера [ingredients]', () => {
    test('Редюсер должен вернуть начальное состояние при получении неизвестного экшена', () => {
      const newState = ingredientsSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(initialState);
    });
  });

  describe('Проверка асинхронного экшена [getIngredients]', () => {
    test('Получение списка ингредиентов [getIngredients.fulfilled]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'getIngredientsApi')
        .mockImplementation(() => Promise.resolve([...expectedResult]));

      await store.dispatch(getIngredients());

      const state = store.getState().ingredients.ingredients;

      expect(state).toEqual([...expectedResult]);
    });
  });

  describe('Проверка редьюсеров [ingredients]', () => {
    test('Проверка редьюсера установки текущего ингредиента (невалидный id) [setCurrentIngredient]', () => {
      store.dispatch(ingredientsSlice.actions.setCurrentIngredient('0'));

      const state = store.getState().ingredients.currentIngredient;

      expect(state).toBeNull();
    });

    test('Проверка редьюсера установки текущего ингредиента (валидный id) [setCurrentIngredient]', () => {
      store.dispatch(
        ingredientsSlice.actions.setCurrentIngredient(
          '643d69a5c3f7b9001cfa093c'
        )
      );

      const state = store.getState().ingredients.currentIngredient;

      expect(state).toEqual(expectedResult[0]);
    });
  });

  describe('Проверка селекторов [ingredients]', () => {
    test('Проверка селектора получения списка ингредиентов [selectIngredients]', () => {
      expect(
        ingredientsSlice.selectors.selectIngredients(store.getState())
      ).toEqual(expectedResult);
    });

    test('Проверка селектора получения текущего ингредиента [selectCurrentIngredient]', () => {
      expect(
        ingredientsSlice.selectors.selectCurrentIngredient(store.getState())
      ).toEqual(expectedResult[0]);
    });

    test('Проверка селектора получения состояния загрузки ингредиентов [selectIsIngredientsLoading]', () => {
      expect(
        ingredientsSlice.selectors.selectIsIngredientsLoading(store.getState())
      ).toEqual(false);
    });
  });
});
