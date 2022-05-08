import {createRole, Role} from "./role.model";

export interface User {
  id: number;
  name: string;
  createdAt: Date;
  lastLoggedInAt: Date;
  roles: Role[];
}

export function createUser(params: Partial<User>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    lastLoggedInAt: params.lastLoggedInAt ? new Date(params.lastLoggedInAt) : new Date(),
    roles: params.roles?.map(role => createRole(role)) ?? []
  } as User;
}
