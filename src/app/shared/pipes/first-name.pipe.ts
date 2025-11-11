import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../users/models/user.model';
import { TaskUserConfig } from '../../tasks/models/task-user-config.model';

@Pipe({ name: 'firstName' })
export class FirstNamePipe implements PipeTransform {
  transform(user: User | TaskUserConfig): string {
    let splitNames;
    if ('userId' in user) {
      splitNames = user.userName.split(' ');
    } else {
      splitNames = user.name.split(' ');
    }
    if (splitNames.length > 0) {
      return splitNames[0];
    }

    return '';
  }
}
