import {createUser, User} from "../../users/models/user.model";

export interface Family {
  id: number;
  name: string;
  color: string;
  members: User[];
  tasksPerWeek: number;
  totalFamilyTasks: number;
}

export function createFamily(params: Partial<Family>) {
  return {
    id: params.id ?? 0,
    name: params.name ?? '',
    color: params.color ?? '#703920',
    members: params.members ? params.members.map(m => createUser(m)) : [],
    tasksPerWeek: params.tasksPerWeek ?? 0,
    totalFamilyTasks: params.totalFamilyTasks ?? 0,
  } as Family;
}
