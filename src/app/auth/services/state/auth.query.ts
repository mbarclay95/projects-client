import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AuthStore} from './auth.store';
import {distinctUntilChanged, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../users/models/user.model";
import {Permissions} from '../../permissions';

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<User> {
  auth$: Observable<User> = this.select();

  isLoggedIn$: Observable<boolean> = this.select().pipe(
    map(auth => !!auth.id),
  );

  showUptimeKuma$: Observable<boolean> = this.select().pipe(
    map(auth => !!auth.clientPermissions.find(p => p === Permissions.LISTEN_TO_UPTIME_KUMA)),
    distinctUntilChanged(),
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
