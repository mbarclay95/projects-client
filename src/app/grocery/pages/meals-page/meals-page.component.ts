import { Component, inject } from '@angular/core';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { MealsSignalStore } from '../../services/meals-signal-store';
import { NoGroceryGroupComponent } from '../../components/no-grocery-group/no-grocery-group.component';
import { MealWeekSelectorComponent } from '../../components/meal-week-selector/meal-week-selector.component';
import { MealDayCardComponent } from '../../components/meal-day-card/meal-day-card.component';

@Component({
  selector: 'app-meals-page',
  templateUrl: './meals-page.component.html',
  styleUrls: ['./meals-page.component.scss'],
  imports: [NoGroceryGroupComponent, MealWeekSelectorComponent, MealDayCardComponent, NzSpinComponent],
})
export class MealsPageComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly mealsStore = inject(MealsSignalStore);

  constructor() {
    this.mealsStore.resetWeekOffset();
  }
}
