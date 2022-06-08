import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AuthStore} from './auth.store';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User} from "../../../users/models/user.model";

@Injectable({providedIn: 'root'})
export class AuthQuery extends Query<User> {
  auth$: Observable<User> = this.select();

  sideMenuClosed$: Observable<boolean> = this.select().pipe(
    map(user => !user.userConfig.sideMenuOpen)
  );

  isLoggedIn$: Observable<boolean> = this.select().pipe(
    map(auth => !!auth.id),
    // debounceTime(1000)
  );

  myColor$: Observable<string> = this.select().pipe(
    map(auth => auth.taskUserConfig?.color ?? '')
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

  getFamilyId(): number|undefined {
    return this.getUser().taskUserConfig?.familyId;
  }

}
