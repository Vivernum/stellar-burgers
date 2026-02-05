import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { AppDispatch, useDispatch } from '../../services/store';
import {
  addBun,
  addIngredient,
  addSauce
} from '../../services/burger-constructor/slice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const handleAdd = () => {
      switch (ingredient.type) {
        case 'bun':
          dispatch(addBun(ingredient));
          break;
        case 'sauce':
          dispatch(addSauce(ingredient));
          break;
        case 'main':
          dispatch(addIngredient(ingredient));
          break;
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
