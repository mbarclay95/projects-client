import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../users/models/user.model";

@Pipe({
  name: 'usersToIds'
})
export class UsersToIdsPipe implements PipeTransform {

  transform(users: User[]): number[] {
    return users.map(user => user.id);
  }

}
