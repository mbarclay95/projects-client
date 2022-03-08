import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {Permissions} from "../../permissions";

export interface AuthState {
   id: number;
   name: string;
   permissions: Permissions[];
}

export function createAuth(params: Partial<AuthState>): AuthState {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    permissions: params.permissions ?? [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {

  constructor() {
    super(createAuth({}));
  }

}
