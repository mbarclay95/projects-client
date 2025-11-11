import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createGoal, Goal } from '../models/goal.model';
import { withUi } from '../../shared/signal-stores/with-ui-feature';
import { computed } from '@angular/core';
import { add, endOfWeek, lightFormat, startOfWeek } from 'date-fns';

export interface GoalsUiState {
  weekOffset: number | null;
}

const initialState: GoalsUiState = {
  weekOffset: 0,
};

export const GoalsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Goal>({
    pluralEntityName: 'goals',
    createEntity: createGoal,
  }),
  withUi(initialState),
  withComputed(({ ui }) => {
    const buildQueryString = computed(() => {
      let queryString = '';
      const uiSnapshot = ui();
      if (uiSnapshot.weekOffset !== null) {
        queryString += `weekOffset=${uiSnapshot.weekOffset}`;
      }

      return queryString;
    });
    const weekString = computed(() => {
      const weekOffset = ui.weekOffset();
      if (weekOffset === null) {
        return '';
      }

      const date = add(new Date(), {
        weeks: weekOffset,
      });
      const startDate = lightFormat(startOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');
      const endDate = lightFormat(endOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');

      return `${startDate} - ${endDate}`;
    });

    return {
      buildQueryString,
      weekString,
    };
  }),
  withMethods((store) => {
    const updateWeekOffset = (byAmount: number): void => {
      const currentUi = store.ui();
      store.updateUiState({ weekOffset: (currentUi.weekOffset ?? 0) + byAmount });
    };

    return {
      updateWeekOffset,
    };
  }),
);

// functions that need to be added here to get this to work again. Not going to go through the effort since this
// isn't being used atm

// getGoalDays(goalId: number): Observable<GoalDayButton[]> {
//   return combineLatest([this.selectEntity(goalId), this.select('ui')]).pipe(
//     map(([goal, ui]) => {
//       if (ui.weekOffset === null || !goal) {
//         return [];
//       }
//       let goalDays: GoalDayButton[] = [];
//       const today = new Date();
//       let date = add(new Date(), {
//         weeks: ui.weekOffset,
//       });
//       date = startOfWeek(date, { weekStartsOn: 1 });
//       for (let i = 0; i < daysOfWeek.length; i++) {
//         const goalDay = goal.goalDays.find((g) => isSameDay(g.date, date));
//         goalDays.push({
//           goalDay: goalDay ? { ...goalDay } : createGoalDay({ id: 0, date }),
//           dayString: daysOfWeek[i],
//           isToday: isSameDay(date, today),
//         });
//         date = add(date, {
//           days: 1,
//         });
//       }
//
//       return goalDays;
//     }),
//   );
// }

// async createNewGoalDay(goalId: number, goalDay: GoalDay): Promise<void> {
//   await firstValueFrom(
//     this.http.post<GoalDay>(`${environment.apiUrl}/goal-days`, { ...goalDay, ...{ goalId } }).pipe(
//       map((goalDay) => createGoalDay(goalDay)),
//       tap((goalDay) =>
//         this.goalsStore.update(goalId, ({ goalDays, currentAmount }) => ({
//           goalDays: arrayAdd(goalDays, goalDay),
//           currentAmount: currentAmount + (goalDay.amount ?? 0),
//         })),
//       ),
//     ),
//   );
// }
//
// async updateGoalDay(goalId: number, goalDay: GoalDay, amountDiff: number): Promise<void> {
//   await firstValueFrom(
//     this.http.patch<GoalDay>(`${environment.apiUrl}/goal-days/${goalDay.id}`, goalDay).pipe(
//       map((goalDay) => createGoalDay(goalDay)),
//       tap((goalDay) =>
//         this.goalsStore.update(goalId, ({ goalDays, currentAmount }) => ({
//           goalDays: arrayUpdate(goalDays, goalDay.id, goalDay),
//           currentAmount: currentAmount + amountDiff,
//         })),
//       ),
//     ),
//   );
// }
//
// async deleteGoalDay(goalId: number, goalDay: GoalDay, initialAmount: number): Promise<void> {
//   await firstValueFrom(
//     this.http.delete(`${environment.apiUrl}/goal-days/${goalDay.id}`).pipe(
//       tap(() =>
//         this.goalsStore.update(goalId, ({ goalDays, currentAmount }) => ({
//           goalDays: arrayRemove(goalDays, goalDay.id),
//           currentAmount: currentAmount - initialAmount,
//         })),
//       ),
//     ),
//   );
// }
