import { Pipe, PipeTransform } from '@angular/core';
import {Role} from "../models/role.model";

@Pipe({
  name: 'rolesToIds'
})
export class RolesToIdsPipe implements PipeTransform {

  transform(roles: Role[]): number[] {
    return roles.map(role => role.id);
  }

}
