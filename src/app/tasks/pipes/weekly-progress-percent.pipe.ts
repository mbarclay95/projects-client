import { Pipe, PipeTransform } from '@angular/core';
import {User} from "../../users/models/user.model";

@Pipe({
  name: 'weeklyProgressPercent'
})
export class WeeklyProgressPercentPipe implements PipeTransform {

  transform(auth: User, returnFraction: boolean = true): number {
    if (!auth.taskUserConfig || auth.taskUserConfig.tasksPerWeek === 0) {
      return 0;
    }

    let progress = auth.taskUserConfig.familyTasksCompleted / auth.taskUserConfig.tasksPerWeek;
    if (progress > 1) {
      progress = 1;
    }

    return progress * (returnFraction ? 1 : 100);
  }

}
