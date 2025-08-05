import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../users/models/user.model';

@Pipe({
  name: 'hasRole',
})
export class HasRolePipe implements PipeTransform {
  transform(user: User, roleId: number): unknown {
    return user.roles.map((r) => r.id).includes(roleId);
  }
}
