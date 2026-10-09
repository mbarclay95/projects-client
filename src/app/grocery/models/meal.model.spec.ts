import { createMeal, datesOfWeek, linkedRecipe, MealSlot, mealName, mealsBySlot } from './meal.model';
import { createRecipe } from './recipe.model';

describe('datesOfWeek', () => {
  it('lists Monday to Sunday of the week containing a Wednesday', () => {
    expect(datesOfWeek(0, new Date(2026, 9, 14))).toEqual([
      '2026-10-12',
      '2026-10-13',
      '2026-10-14',
      '2026-10-15',
      '2026-10-16',
      '2026-10-17',
      '2026-10-18',
    ]);
  });

  it('keeps a Sunday in the week that ends on it', () => {
    expect(datesOfWeek(0, new Date(2026, 9, 18))[0]).toEqual('2026-10-12');
  });

  it('starts on a Monday when today is Monday', () => {
    expect(datesOfWeek(0, new Date(2026, 9, 12))[0]).toEqual('2026-10-12');
  });

  it('moves a week back and forward with the offset', () => {
    expect(datesOfWeek(-1, new Date(2026, 9, 14))[0]).toEqual('2026-10-05');
    expect(datesOfWeek(1, new Date(2026, 9, 14))[0]).toEqual('2026-10-19');
  });
});

describe('mealsBySlot', () => {
  const date = '2026-10-12';

  it('omits a slot with no dishes', () => {
    const groups = mealsBySlot([createMeal({ id: 1, date, slot: MealSlot.dinner })], date);

    expect(groups.map((group) => group.slot)).toEqual([MealSlot.dinner]);
  });

  it('orders slots breakfast, lunch, dinner and dishes by position', () => {
    const groups = mealsBySlot(
      [
        createMeal({ id: 1, date, slot: MealSlot.dinner, position: 1, name: 'rice' }),
        createMeal({ id: 2, date, slot: MealSlot.breakfast, position: 0, name: 'Oatmeal' }),
        createMeal({ id: 3, date, slot: MealSlot.dinner, position: 0, name: 'Tacos' }),
      ],
      date,
    );

    expect(groups.map((group) => group.slot)).toEqual([MealSlot.breakfast, MealSlot.dinner]);
    expect(groups[1].meals.map((meal) => meal.name)).toEqual(['Tacos', 'rice']);
  });

  it('ignores dishes on other dates', () => {
    const groups = mealsBySlot([createMeal({ id: 1, date: '2026-10-13', slot: MealSlot.lunch })], date);

    expect(groups).toEqual([]);
  });
});

describe('linkedRecipe', () => {
  it('is undefined when unlinked or when the recipe is not in the list', () => {
    const recipes = [createRecipe({ id: 1, name: 'Tacos' })];

    expect(linkedRecipe(createMeal({ recipeId: null }), recipes)).toBeUndefined();
    expect(linkedRecipe(createMeal({ recipeId: 2 }), recipes)).toBeUndefined();
  });
});

describe('mealName', () => {
  it("is the linked recipe's current name", () => {
    const recipes = [createRecipe({ id: 1, name: 'Street Tacos' })];

    expect(mealName(createMeal({ name: 'Tacos', recipeId: 1 }), recipes)).toEqual('Street Tacos');
  });

  it('falls back to the stored name when nothing is linked', () => {
    expect(mealName(createMeal({ name: 'Leftovers' }), [])).toEqual('Leftovers');
  });
});
