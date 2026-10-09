import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntities, removeEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { lightFormat, parseISO } from 'date-fns';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { withCrudEntities } from '../../shared/signal-stores/with-crud-feature';
import { createMeal, datesOfWeek, Meal, MealDraft } from '../models/meal.model';
import { environment } from '../../../environments/environment';

interface MealsUiState {
  weekOffset: number;
  editingDate: string | undefined;
  savingDay: boolean;
}

const initialState: MealsUiState = {
  weekOffset: 0,
  editingDate: undefined,
  savingDay: false,
};

export const MealsSignalStore = signalStore(
  { providedIn: 'root' },
  withCrudEntities<Meal>({
    pluralEntityName: 'meals',
    createEntity: createMeal,
  }),
  withState(initialState),
  withComputed(({ weekOffset }) => {
    const weekDates = computed(() => datesOfWeek(weekOffset(), new Date()));
    const weekStart = computed(() => weekDates()[0]);
    const buildQueryString = computed(() => `weekStart=${weekStart()}`);
    const weekString = computed(() => {
      const dates = weekDates();
      return `${lightFormat(parseISO(dates[0]), 'MM/dd/yy')} - ${lightFormat(parseISO(dates[6]), 'MM/dd/yy')}`;
    });

    return {
      weekDates,
      weekStart,
      buildQueryString,
      weekString,
    };
  }),
  withMethods((store) => {
    const httpClient = inject(HttpClient);
    const nzMessageService = inject(NzMessageService);

    const updateWeekOffset = (change: number) => patchState(store, { weekOffset: store.weekOffset() + change });
    const resetWeekOffset = () => patchState(store, { weekOffset: 0 });
    const openDay = (date: string) => patchState(store, { editingDate: date });
    const closeDay = () => patchState(store, { editingDate: undefined });

    const saveDay = rxMethod<{ date: string; meals: MealDraft[]; onSuccess?: () => void }>(
      pipe(
        exhaustMap(({ date, meals, onSuccess }) => {
          patchState(store, { savingDay: true });
          return httpClient.put<Meal[]>(`${environment.apiUrl}/meals/days/${date}`, { meals }).pipe(
            tap((saved) => {
              const staleIds = store
                .entities()
                .filter((meal) => meal.date === date)
                .map((meal) => meal.id);
              patchState(store, removeEntities(staleIds));
              if (store.weekDates().includes(date)) {
                patchState(store, addEntities(saved.map((meal) => createMeal(meal))));
              }
              patchState(store, { savingDay: false });
              if (onSuccess) {
                onSuccess();
              }
            }),
            catchError((error) => {
              console.log(error);
              patchState(store, { savingDay: false });
              nzMessageService.error(error.error.message ?? 'There was an error saving the meals.');
              return of(undefined);
            }),
          );
        }),
      ),
    );

    return {
      updateWeekOffset,
      resetWeekOffset,
      openDay,
      closeDay,
      saveDay,
    };
  }),
);
