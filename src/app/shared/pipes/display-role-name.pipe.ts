import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../users/models/role.model';

@Pipe({
  name: 'displayRoleName',
  standalone: false,
})
export class DisplayRoleNamePipe implements PipeTransform {
  transform(role: Role): string {
    const roleParts = role.name.split('_');
    if (roleParts.length === 0) {
      return '';
    }
    if (roleParts.length === 1) {
      return roleParts[0].charAt(0).toUpperCase() + roleParts[0].slice(1);
    }
    let roleName = '';
    roleParts.pop();
    for (const role of roleParts) {
      roleName += role.charAt(0).toUpperCase() + role.slice(1) + ' ';
    }

    return roleName;
  }
}
