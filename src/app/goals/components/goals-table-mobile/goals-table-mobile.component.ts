import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgClass, AsyncPipe } from '@angular/common';
import { GoalDayButtonComponent } from '../goal-day-button/goal-day-button.component';
import { PluralizeGoalPipe } from '../../pipes/pluralize-goal.pipe';
import { GoalDaysPipe } from '../../pipes/goal-days.pipe';

@Component({
  selector: 'app-goals-table-mobile',
  templateUrl: './goals-table-mobile.component.html',
  styleUrls: ['./goals-table-mobile.component.scss'],
  imports: [FaIconComponent, NgClass, GoalDayButtonComponent, AsyncPipe, PluralizeGoalPipe, GoalDaysPipe],
})
export class GoalsTableMobileComponent {
  @Input() set goals(goals: Goal[] | null) {
    if (goals) {
      this._goals = goals;
    }
  }
  @Output() editGoal: EventEmitter<number> = new EventEmitter<number>();

  _goals: Goal[] = [];
  edit = faEdit;
}
