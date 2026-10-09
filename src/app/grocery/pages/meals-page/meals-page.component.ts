import { Component, inject } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { RecipesSignalStore } from '../../services/recipes-signal-store';
import { AddRecipeIngredientsModalComponent } from '../../components/add-recipe-ingredients-modal/add-recipe-ingredients-modal.component';
import { MealsSignalStore } from '../../services/meals-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { MealWeekSelectorComponent } from '../../components/meal-week-selector/meal-week-selector.component';
import { EditMealDayModalComponent } from '../../components/edit-meal-day-modal/edit-meal-day-modal.component';
import { MealDayCardComponent } from '../../components/meal-day-card/meal-day-card.component';

@Component({
  selector: 'app-meals-page',
  templateUrl: './meals-page.component.html',
  styleUrls: ['./meals-page.component.scss'],
  imports: [
    NoGroceryGroupComponent,
    MealWeekSelectorComponent,
    MealDayCardComponent,
    EditMealDayModalComponent,
    AddRecipeIngredientsModalComponent,
    NzSpinComponent,
    NzModalModule,
  ],
})
export class MealsPageComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly mealsStore = inject(MealsSignalStore);
  readonly recipesStore = inject(RecipesSignalStore);

  constructor() {
    this.mealsStore.resetWeekOffset();
  }
}
