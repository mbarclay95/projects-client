import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usersToIds' })
export class UsersToIdsPipe implements PipeTransform {
  transform(users: { id: number; name: string }[]): number[] {
    return users.map((user) => user.id);
  }
}
