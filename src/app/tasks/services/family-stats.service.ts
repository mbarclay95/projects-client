import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, tap} from 'rxjs';
import {getYear} from 'date-fns';
import {FamiliesQuery} from './families/state/families.query';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {createFamilyMemberStats, FamilyMemberStats} from '../models/family-member-stats.model';

@Injectable({
  providedIn: 'root'
})
export class FamilyStatsService {
  private uiSubject: BehaviorSubject<FamilyStatsUi> = new BehaviorSubject<FamilyStatsUi>({
    year: getYear(new Date())
  });
  ui$: Observable<FamilyStatsUi> = combineLatest([
    this.familiesQuery.selectActive(),
    this.uiSubject.asObservable()
  ]).pipe(
    map(([family, ui]) => {
      this.loadFamilyStats(ui, family?.id);
      return ui;
    })
  );

  yearBehindDisabled$: Observable<boolean> = combineLatest([
    this.familiesQuery.selectActive(),
    this.uiSubject.asObservable()
  ]).pipe(
    map(([family, ui]) => !!family && family.minYear === ui.year)
  );

  yearAheadDisabled$: Observable<boolean> = this.uiSubject.asObservable().pipe(
    map((ui) => getYear(new Date()) === ui.year)
  );

  private statsSubject: BehaviorSubject<FamilyMemberStats[]> = new BehaviorSubject<FamilyMemberStats[]>([]);
  stats$: Observable<FamilyMemberStats[]> = this.statsSubject.asObservable();

  constructor(
    private familiesQuery: FamiliesQuery,
    private http: HttpClient
  ) {
  }

  nextYear(): void {
    const currentYear = this.uiSubject.getValue().year;
    this.uiSubject.next({
      year: currentYear + 1
    });
  }

  previousYear(): void {
    const currentYear = this.uiSubject.getValue().year;
    this.uiSubject.next({
      year: currentYear - 1
    });
  }

  loadFamilyStats(ui: FamilyStatsUi, familyId?: number): void {
    if (!familyId) {
      this.statsSubject.next([]);
      return;
    }

    this.http.get<FamilyMemberStats[]>(`${environment.apiUrl}/family-stats?familyId=${familyId}&year=${ui.year}`).pipe(
      map((stats) => stats.map((stat) => createFamilyMemberStats(stat))),
      tap((stats) => this.statsSubject.next(stats))
    ).subscribe();
  }
}

export interface FamilyStatsUi {
  year: number
}


