import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UsersService} from "./services/state/users.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<void> {

  constructor(
    private usersService: UsersService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.usersService.getUsers();
  }
}
