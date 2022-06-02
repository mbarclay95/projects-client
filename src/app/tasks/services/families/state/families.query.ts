import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FamiliesStore, FamiliesState } from './families.store';
import {Observable} from "rxjs";
import {Family} from "../../../models/family.model";

@Injectable({ providedIn: 'root' })
export class FamiliesQuery extends QueryEntity<FamiliesState> {
  families$: Observable<Family[]> = this.selectAll();

  constructor(
    protected override store: FamiliesStore
  ) {
    super(store);
  }

  get activeId(): number|undefined {
    return this.getActive()?.id;
  }

}
