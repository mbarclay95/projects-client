import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../models/role.model';

@Pipe({
  name: 'rolesToIds',
  standalone: false,
})
export class RolesToIdsPipe implements PipeTransform {
  transform(roles: Role[]): number[] {
    return roles.map((role) => role.id);
  }
}
