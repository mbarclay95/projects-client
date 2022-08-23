import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../users/models/user.model";

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(user: User): string {
    const splitNames = user.name.split(' ');
    if (splitNames.length > 1) {
      return splitNames[0];
    }

    return user.name;
  }

}
