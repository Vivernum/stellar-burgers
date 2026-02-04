import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export type IngredientsState = {
  ingredients: TIngredient[];
};

export const initialState: IngredientsState = {
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients
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

export const { selectIngredients } = ingredientsSlice.selectors;
