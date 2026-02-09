import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { AppDispatch, useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import {
  selectIngredientsById,
  setCurrentIngredient
} from '../../services/ingredients/slice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();

  const id = useParams().id;

  dispatch(setCurrentIngredient(id));

  const ingredientData = useSelector(selectIngredientsById);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
