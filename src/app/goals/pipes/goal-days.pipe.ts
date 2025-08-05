import { Pipe, PipeTransform } from '@angular/core';
import { GoalsQuery } from '../services/state/goals.query';
import { Observable } from 'rxjs';
import { GoalDayButton } from '../models/goal-day.model';

@Pipe({
  name: 'goalDays',
  standalone: false,
})
export class GoalDaysPipe implements PipeTransform {
  constructor(private goalsQuery: GoalsQuery) {}

  transform(goalId: number): Observable<GoalDayButton[]> {
    return this.goalsQuery.getGoalDays(goalId);
  }
}
