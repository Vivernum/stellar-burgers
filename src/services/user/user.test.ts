import { TUser } from '@utils-types';
import * as burgerAPI from '../../utils/burger-api';
import { getUser, updateUser } from './actions';
import { configureStore } from '@reduxjs/toolkit';
import {
  logout,
  selectIsAuthChecked,
  selectPendingStatus,
  selectUser,
  setIsRequestPending,
  setUser,
  userSlice
} from './slice';

describe('Тесты слайса [user]', () => {
  type TUserState = {
    user: TUser | null;
    isAuthChecked: boolean;
    isRequestPending: boolean;
  };

  const initialUserState: TUserState = {
    user: null,
    isAuthChecked: false,
    isRequestPending: false
  };

  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });

  const expectedResult = {
    user: {
      email: 'test@ya.ru',
      name: 'Ivan'
    }
  };

  const expectedUpdatedResult = {
    user: {
      email: 'testik@ya.ru',
      name: 'Anya'
    }
  };

  describe('Проверка настройки редьюсера [user]', () => {
    test('Редюсер должен вернуть начальное состояние при получении неизвестного экшена', () => {
      const newState = userSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      });

      expect(newState).toEqual(initialUserState);
    });
  });

  describe('Проверка асинхронных экшенов [user]', () => {
    test('Проверка экшена получения данных пользователя [getUser]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'getUserApi')
        .mockImplementation(() =>
          Promise.resolve({ ...expectedResult, success: true })
        );

      await store.dispatch(getUser());

      expect(store.getState().user.user).toEqual(expectedResult.user);
    });

    test('Прверка экшена обновления данных о пользователе [updateUser]', async () => {
      const mock = jest
        .spyOn(burgerAPI, 'updateUserApi')
        .mockImplementation(() =>
          Promise.resolve({ ...expectedUpdatedResult, success: true })
        );

      await store.dispatch(
        updateUser({
          email: 'testik@ya.ru',
          name: 'Anya',
          password: 'whatever'
        })
      );

      expect(store.getState().user.user).toEqual(expectedUpdatedResult.user);
    });
  });

  describe('Проверка селекторов [user]', () => {
    test('Проверка селектора получения пользователя [selectUser]', () => {
      expect(selectUser(store.getState())).toEqual(expectedUpdatedResult.user);
    });

    test('Проверка селектора получения состояния проверки авторизации [selectIsAuthChecked]', () => {
      expect(selectIsAuthChecked(store.getState())).toBe(true);
    });

    test('Проверка селектора статуса запроса [selectPendingStatus]', () => {
      expect(selectPendingStatus(store.getState())).toBe(false);
    });
  });

  describe('Проверка редьюсеров [user]', () => {
    test('Проверка редьюсера устанавливающего пользователя [setUser]', () => {
      store.dispatch(setUser(expectedResult.user));

      expect(store.getState().user.user).toEqual(expectedResult.user);
    });

    test('Проверка редьюсера, устанавливающего состояние запроса [setPendingStatus]', () => {
      store.dispatch(setIsRequestPending(true));

      expect(store.getState().user.isRequestPending).toBe(true);
    });

    test('Проверка редьюсера выхода из учетной записи [logout]', () => {
      store.dispatch(logout());

      expect(store.getState().user.user).toBeNull();
    });
  });
});
