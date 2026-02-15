import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from './actions';

export type IngredientsState = {
  ingredients: TIngredient[];
  currentIngredient: TIngredient | null;
  isIngredientsLoading: boolean;
};

const initialState: IngredientsState = {
  ingredients: [],
  currentIngredient: null,
  isIngredientsLoading: false
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
    },
    selectIsIngredientsLoading: (state) => state.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isIngredientsLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        alert('error');
        state.isIngredientsLoading = false;
      });
  }
});

export const {
  selectIngredients,
  selectCurrentIngredient: selectIngredientsById,
  selectIsIngredientsLoading
} = ingredientsSlice.selectors;
export const { setCurrentIngredient } = ingredientsSlice.actions;
