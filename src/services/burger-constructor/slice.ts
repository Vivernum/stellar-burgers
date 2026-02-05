import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
};

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: { payload: TIngredient }) => {
      state.ingredients.push(action.payload);
    },
    addBun: (state, action: { payload: TIngredient }) => {
      state.bun = action.payload;
    },
    addSauce: (state, action: { payload: TIngredient }) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.type !== 'sauce'
      );
      state.ingredients.push(action.payload);
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state
  }
});

export const { addIngredient, addBun, addSauce } =
  burgerConstructorSlice.actions;
export const { selectBurgerConstructor } = burgerConstructorSlice.selectors;
