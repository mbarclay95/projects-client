import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {createUser, User} from "../../../users/models/user.model";

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<User> {

  constructor() {
    super(createUser({}));
  }

}
