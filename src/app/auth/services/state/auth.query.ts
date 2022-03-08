import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AuthStore, AuthState } from './auth.store';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  isLoggedIn$: Observable<boolean> = this.select().pipe(
    map(auth => !!auth.id)
  );

  constructor(
    protected override store: AuthStore
  ) {
    super(store);
  }

  isLoggedIn(): boolean {
    return !!this.getValue().id;
  }

  getUser(): AuthState {
    return this.getValue();
  }

}
