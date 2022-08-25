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

    let progress = auth.taskUserConfig.completedFamilyTasks.length / auth.taskUserConfig.tasksPerWeek;
    if (progress > 1) {
      progress = 1;
    }

    if (returnFraction) {
      return progress;
    }

    return parseFloat((progress * 100.0).toFixed(0));
  }

}
