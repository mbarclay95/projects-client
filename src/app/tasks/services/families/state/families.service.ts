import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createFamily, Family} from '../../../models/family.model';
import {FamiliesStore} from './families.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {FamiliesQuery} from "./families.query";

@Injectable({providedIn: 'root'})
export class FamiliesService {

  constructor(
    private familiesStore: FamiliesStore,
    private http: HttpClient,
    private familiesQuery: FamiliesQuery,
  ) {
  }

  async getFamilies(): Promise<void> {
    await firstValueFrom(this.http.get<Family[]>(`${environment.apiUrl}/families`).pipe(
      map(families => families.map(family => createFamily(family))),
      tap(families => this.familiesStore.set(families))
    ));
  }

  async getFamily(familyId: number): Promise<void> {
    await firstValueFrom(this.http.get<Family>(`${environment.apiUrl}/families/${familyId}`).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.upsert(familyId, family))
    ));
  }

  setActive(familyId: number): void {
    this.familiesStore.setActive(familyId);
  }

  async createNewFamily(family: Family): Promise<void> {
    await firstValueFrom(this.http.post<Family>(`${environment.apiUrl}/families`, family).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.add(family))
    ));
  }

  async updateFamily(familyId: number, family: Partial<Family>): Promise<void> {
    const newFamily = {...this.familiesQuery.getEntity(familyId), ...family};
    await firstValueFrom(this.http.put<Family>(`${environment.apiUrl}/families/${familyId}`, newFamily).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.update(family.id, family))
    ));
  }

}
