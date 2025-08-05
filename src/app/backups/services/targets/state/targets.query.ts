import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TargetsStore, TargetsState } from './targets.store';
import { Observable } from 'rxjs';
import { Target } from '../../../models/target.model';

@Injectable({ providedIn: 'root' })
export class TargetsQuery extends QueryEntity<TargetsState> {
  target$: Observable<Target[]> = this.selectAll();

  constructor(protected override store: TargetsStore) {
    super(store);
  }
}
