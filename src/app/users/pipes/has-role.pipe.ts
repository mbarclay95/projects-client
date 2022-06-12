import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../models/user.model";

@Pipe({
  name: 'hasRole'
})
export class HasRolePipe implements PipeTransform {

  transform(user: User, roleId: number): boolean {
    return user.roles.map(r => r.id).includes(roleId);
  }

}
