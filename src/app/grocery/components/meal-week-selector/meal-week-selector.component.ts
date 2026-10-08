import { Component, inject } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MealsSignalStore } from '../../services/meals-signal-store';

@Component({
  selector: 'app-meal-week-selector',
  templateUrl: './meal-week-selector.component.html',
  styleUrls: ['./meal-week-selector.component.scss'],
  imports: [NzButtonComponent, FaIconComponent],
})
export class MealWeekSelectorComponent {
  left = faCaretLeft;
  right = faCaretRight;

  readonly mealsStore = inject(MealsSignalStore);
}
