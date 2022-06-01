import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ID} from '@datorama/akita';
import {map, tap} from 'rxjs/operators';
import {createFamily, Family} from '../../../models/family.model';
import {FamiliesStore} from './families.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class FamiliesService {

  constructor(
    private familiesStore: FamiliesStore,
    private http: HttpClient
  ) {
  }

  async getFamilies(): Promise<void> {
    await firstValueFrom(this.http.get<Family[]>(`${environment.apiUrl}/families`).pipe(
      map(families => families.map(family => createFamily(family))),
      tap(families => this.familiesStore.set(families))
    ));
  }

  async createNewFamily(family: Family) {
    
  }

  async updateFamily(family: Family) {
    
  }
}
