import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Component, computed, inject, input } from '@angular/core';
import { format, lightFormat, parseISO } from 'date-fns';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBookOpen, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { MealsSignalStore } from '../../services/meals-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { linkedRecipe, MEAL_SLOT_LABELS, mealName, mealsBySlot } from '../../models/meal.model';

@Component({
  selector: 'app-meal-day-card',
  templateUrl: './meal-day-card.component.html',
  styleUrls: ['./meal-day-card.component.scss'],
  imports: [FaIconComponent, NzButtonComponent],
  host: {
    '[class.today]': 'isToday()',
    '(click)': 'mealsStore.openDay(date())',
  },
})
export class MealDayCardComponent {
  readonly date = input.required<string>();

  readonly mealsStore = inject(MealsSignalStore);
  readonly recipesStore = inject(RecipesSignalStore);

  readonly recipeIcon = faBookOpen;
  readonly cartIcon = faCartPlus;
  readonly slotLabels = MEAL_SLOT_LABELS;
  readonly linkedRecipe = linkedRecipe;
  readonly mealName = mealName;

  readonly heading = computed(() => format(parseISO(this.date()), 'EEEE, MMM d'));
  readonly isToday = computed(() => this.date() === lightFormat(new Date(), 'yyyy-MM-dd'));
  readonly groups = computed(() => mealsBySlot(this.mealsStore.entities(), this.date()));

  addIngredients(event: MouseEvent, recipeId: number): void {
    event.stopPropagation();
    this.recipesStore.openIngredients(recipeId);
  }
}
