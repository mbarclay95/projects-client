import { addDays, addWeeks, lightFormat, startOfWeek } from 'date-fns';
import { Recipe } from './recipe.model';

export enum MealSlot {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
}

export const MEAL_SLOTS: MealSlot[] = [MealSlot.breakfast, MealSlot.lunch, MealSlot.dinner];

export const MEAL_SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};

export interface Meal {
  id: number;
  date: string;
  slot: MealSlot;
  position: number;
  name: string;
  recipeId: number | null;
}

export interface MealDraft {
  slot: MealSlot;
  name: string;
}

export interface MealSlotGroup {
  slot: MealSlot;
  meals: Meal[];
}

export function createMeal(params: Partial<Meal>) {
  return {
    id: params.id ?? 0,
    date: params.date ?? '',
    slot: params.slot ?? MealSlot.dinner,
    position: params.position ?? 0,
    name: params.name ?? '',
    recipeId: params.recipeId ?? null,
  } as Meal;
}

export function datesOfWeek(weekOffset: number, today: Date): string[] {
  const monday = startOfWeek(addWeeks(today, weekOffset), { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, index) => lightFormat(addDays(monday, index), 'yyyy-MM-dd'));
}

export function mealsBySlot(meals: Meal[], date: string): MealSlotGroup[] {
  const onDate = meals.filter((meal) => meal.date === date);
  return MEAL_SLOTS.map((slot) => ({
    slot,
    meals: onDate.filter((meal) => meal.slot === slot).sort((a, b) => a.position - b.position),
  })).filter((group) => group.meals.length > 0);
}

export function linkedRecipe(meal: Meal, recipes: Recipe[]): Recipe | undefined {
  if (meal.recipeId === null) {
    return undefined;
  }
  return recipes.find((recipe) => recipe.id === meal.recipeId);
}

export function mealName(meal: Meal, recipes: Recipe[]): string {
  return linkedRecipe(meal, recipes)?.name ?? meal.name;
}
