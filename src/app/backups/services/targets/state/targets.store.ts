import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Target } from '../../../models/target.model';

export interface TargetsState extends EntityState<Target> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'targets' })
export class TargetsStore extends EntityStore<TargetsState> {

  constructor() {
    super();
  }

}
