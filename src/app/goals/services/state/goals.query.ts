import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GoalsStore, GoalsState, GoalsUiState } from './goals.store';
import { combineLatest, Observable } from 'rxjs';
import { daysOfWeek, Goal } from '../../models/goal.model';
import { add, endOfWeek, isSameDay, lightFormat, startOfWeek } from 'date-fns';
import { map } from 'rxjs/operators';
import { createGoalDay, GoalDayButton } from '../../models/goal-day.model';

@Injectable({ providedIn: 'root' })
export class GoalsQuery extends QueryEntity<GoalsState> {
  goals$: Observable<Goal[]> = this.selectAll();

  weekString$: Observable<string> = this.select('ui').pipe(
    map((ui) => {
      if (ui.weekOffset === null) {
        return '';
      }

      let date = add(new Date(), {
        weeks: ui.weekOffset,
      });
      const startDate = lightFormat(startOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');
      const endDate = lightFormat(endOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');

      return `${startDate} - ${endDate}`;
    }),
  );

  constructor(protected override store: GoalsStore) {
    super(store);
  }

  getUi(): GoalsUiState {
    return this.getValue().ui;
  }

  buildQueryString(forUpdate: boolean = false): string {
    const ui = this.getUi();
    let queryString = '';
    if (ui.weekOffset !== null) {
      queryString += `weekOffset=${ui.weekOffset}`;
      if (forUpdate) {
        return queryString;
      }
    }

    return queryString;
  }

  getGoalDays(goalId: number): Observable<GoalDayButton[]> {
    return combineLatest([this.selectEntity(goalId), this.select('ui')]).pipe(
      map(([goal, ui]) => {
        if (ui.weekOffset === null || !goal) {
          return [];
        }
        let goalDays: GoalDayButton[] = [];
        const today = new Date();
        let date = add(new Date(), {
          weeks: ui.weekOffset,
        });
        date = startOfWeek(date, { weekStartsOn: 1 });
        for (let i = 0; i < daysOfWeek.length; i++) {
          const goalDay = goal.goalDays.find((g) => isSameDay(g.date, date));
          goalDays.push({
            goalDay: goalDay ? { ...goalDay } : createGoalDay({ id: 0, date }),
            dayString: daysOfWeek[i],
            isToday: isSameDay(date, today),
          });
          date = add(date, {
            days: 1,
          });
        }

        return goalDays;
      }),
    );
  }
}
