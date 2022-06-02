import {createUser, User} from "../../users/models/user.model";

export interface Family {
  id: number;
  name: string;
  members: User[]
}

export function createFamily(params: Partial<Family>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    members: params.members ? params.members.map(m => createUser(m)) : []
  } as Family;
}
