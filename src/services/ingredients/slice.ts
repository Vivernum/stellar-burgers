import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export type IngredientsState = {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
};

export const initialState: IngredientsState = {
  ingredients: [],
  currentIngredient: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: { payload: string | undefined }) => {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient._id === action.payload
      );
      if (ingredient) state.currentIngredient = ingredient;
      else state.currentIngredient = null;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectCurrentIngredient: (state) => {
      const ingredient = state.ingredients.find(
        (ingredient) => ingredient._id === state.currentIngredient?._id
      );
      return ingredient;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (sate) => {
        alert('error');
      });
  }
});

export const {
  selectIngredients,
  selectCurrentIngredient: selectIngredientsById
} = ingredientsSlice.selectors;
export const { setCurrentIngredient } = ingredientsSlice.actions;
