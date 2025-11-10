import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GoalDayButton } from '../models/goal-day.model';

@Pipe({ name: 'goalDays' })
export class GoalDaysPipe implements PipeTransform {
  transform(goalId: number): Observable<GoalDayButton[]> {
    // return this.goalsQuery.getGoalDays(goalId);
    return of([]);
  }
}
