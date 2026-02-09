import { TIngredient } from '@utils-types';

export function fitlerIngredientsByType(
  ingredients: TIngredient[]
): [buns: TIngredient[], mains: TIngredient[], sauces: TIngredient[]] {
  const buns: TIngredient[] = [];
  const mains: TIngredient[] = [];
  const sauces: TIngredient[] = [];

  ingredients.forEach((item) => {
    if (item.type === 'bun') buns.push(item);
    if (item.type === 'main') mains.push(item);
    if (item.type === 'sauce') sauces.push(item);
  });

  return [buns, mains, sauces];
}
