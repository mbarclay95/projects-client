import {Pipe, PipeTransform} from '@angular/core';
import {FamiliesQuery} from "../services/families/state/families.query";
import {User} from "../../users/models/user.model";

@Pipe({
  name: 'totalCompletedTasks'
})
export class TotalCompletedTasksPipe implements PipeTransform {

  constructor(
    private familiesQuery: FamiliesQuery
  ) {
  }

  transform(user: User, ...args: unknown[]): number {
    if (!user.taskUserConfig) {
      return 0;
    }
    const activeFamily = this.familiesQuery.getActive();
    if (!activeFamily) {
      return 0;
    }

    return activeFamily.taskStrategy === 'per task' ?
      user.taskUserConfig.completedFamilyTasks.length :
      user.taskUserConfig.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);

  }

}
