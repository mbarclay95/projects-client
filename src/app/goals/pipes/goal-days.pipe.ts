import { Pipe, PipeTransform } from '@angular/core';
import {GoalsQuery} from '../services/state/goals.query';
import {Observable} from 'rxjs';
import {GoalDay} from '../models/goal.model';

@Pipe({
  name: 'goalDays'
})
export class GoalDaysPipe implements PipeTransform {

  constructor(
    private goalsQuery: GoalsQuery
  ) {
  }

  transform(goalId: number): Observable<{ goalDay: GoalDay; dayString: string }[]> {
    return this.goalsQuery.getGoalDays(goalId);
  }

}
