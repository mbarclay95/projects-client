import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AuthStore} from './auth.store';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../users/models/user.model";

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<User> {
  auth$: Observable<User> = this.select();

  isLoggedIn$: Observable<boolean> = this.select().pipe(
    map(auth => !!auth.id),
  );

  constructor(
    protected override store: AuthStore
  ) {
    super(store);
  }

  isLoggedIn(): boolean {
    return !!this.getValue().id;
  }

  getUser(): User {
    return this.getValue();
  }

  hasMoneyAppToken(): boolean {
    return !!this.getUser().userConfig.moneyAppToken;
  }
}
