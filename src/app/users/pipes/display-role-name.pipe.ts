import { Pipe, PipeTransform } from '@angular/core';
import {Role} from "../models/role.model";

@Pipe({
  name: 'displayRoleName'
})
export class DisplayRoleNamePipe implements PipeTransform {

  transform(role: Role): string {
    let roleName = role.name.split('_')[0];
    roleName = roleName.charAt(0).toUpperCase() + roleName.slice(1);

    return roleName;
  }

}
