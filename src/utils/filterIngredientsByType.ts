import { TIngredient } from '@utils-types';

export type TIngredientType = 'bun' | 'main' | 'sauce';

export function fitlerIngredientsByType(
  ingredients: TIngredient[],
  type: TIngredientType
): TIngredient[] {
  const result = ingredients.filter((item) => item.type === type);
  return result;
}
