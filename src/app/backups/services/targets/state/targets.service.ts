import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import {map, tap} from 'rxjs/operators';
import {createTarget, Target} from '../../../models/target.model';
import { TargetsStore } from './targets.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TargetsService {

  constructor(
    private targetsStore: TargetsStore,
    private http: HttpClient
  ) {}

  async getTargets(): Promise<void> {
    await firstValueFrom(this.http.get<Target[]>(`${environment.apiUrl}/targets`).pipe(
      map(targets => targets.map(target => createTarget(target))),
      tap(targets => this.targetsStore.set(targets))
    ));
  }

  async createNewTarget(target: Target): Promise<Target> {
    return await firstValueFrom(this.http.post<Target>(`${environment.apiUrl}/targets`, target).pipe(
      map(target => createTarget(target)),
      tap(target => this.targetsStore.add(target))
    ));
  }

}
