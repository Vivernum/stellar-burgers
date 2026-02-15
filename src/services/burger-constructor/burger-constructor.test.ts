import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from './slice';
import { bunData, mainData, sauceData } from '../ingredientsData';

const initialConstructorState = {
  bun: null,
  ingredients: []
};

const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorSlice.reducer
  }
});

afterAll(() => {
  store.dispatch(burgerConstructorSlice.actions.clearConstructor());
});

const expectedResult = [
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
  }
];

describe('Тесты слайса [burger-constructor]', () => {
  describe('Тесты редьюсеров [burger-constructor]', () => {
    test('Редюсер должен вернуть начальное состояние при получении неизвестного экшена', () => {
      const newState = burgerConstructorSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(initialConstructorState);
    });

    test('Проверка добавления ингредиентов [addIngredient]', () => {
      store.dispatch(burgerConstructorSlice.actions.addIngredient(mainData[0]));
      store.dispatch(burgerConstructorSlice.actions.addIngredient(mainData[1]));

      const { ingredients } = store.getState().burgerConstructor;

      expect(ingredients).toEqual(expectedResult);
    });

    test('Проверка добавления одной булки [addBun]', () => {
      store.dispatch(burgerConstructorSlice.actions.addBun(bunData[0]));

      const { bun } = store.getState().burgerConstructor;

      expect(bun).toEqual(bunData[0]);
    });

    test('Проверка замены булки [addBun]', () => {
      store.dispatch(burgerConstructorSlice.actions.addBun(bunData[1]));

      const { bun } = store.getState().burgerConstructor;

      expect(bun).toEqual(bunData[1]);
    });

    test('Проверка добавления соуса [addSauce]', () => {
      store.dispatch(burgerConstructorSlice.actions.addSauce(sauceData[0]));

      const { ingredients } = store.getState().burgerConstructor;

      expect(ingredients).toEqual([...expectedResult, sauceData[0]]);
    });

    test('Проверка замены соуса [addSauce]', () => {
      store.dispatch(burgerConstructorSlice.actions.addSauce(sauceData[1]));

      const { ingredients } = store.getState().burgerConstructor;

      expect(ingredients).toEqual([...expectedResult, sauceData[1]]);
    });

    test('Проверка удаления ингредиента [removeIngredient]', () => {
      store.dispatch(
        burgerConstructorSlice.actions.removeIngredient(sauceData[0]._id)
      );

      const { ingredients } = store.getState().burgerConstructor;

      expect(ingredients).toEqual(expectedResult);
    });

    test('Проверка очистки конструктора [clearConstructor]', () => {
      store.dispatch(burgerConstructorSlice.actions.clearConstructor());

      const state = store.getState().burgerConstructor;

      expect(state).toEqual(initialConstructorState);
    });
  });

  describe('Тесты селекторов [burger-constructor]', () => {
    test('Проверка селектора [selectBurgerConstructor]', () => {
      store.dispatch(burgerConstructorSlice.actions.addIngredient(mainData[0]));
      store.dispatch(burgerConstructorSlice.actions.addIngredient(mainData[1]));

      expect(
        burgerConstructorSlice.selectors.selectBurgerConstructor(
          store.getState()
        )
      ).toEqual({
        ingredients: [mainData[0], mainData[1]],
        bun: null
      });
    });
  });
});
