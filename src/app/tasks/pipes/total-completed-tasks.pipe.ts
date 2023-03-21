import {Pipe, PipeTransform} from '@angular/core';
import {FamiliesQuery} from "../services/families/state/families.query";
import {TaskUserConfig} from '../models/task-user-config.model';

@Pipe({
  name: 'totalCompletedTasks'
})
export class TotalCompletedTasksPipe implements PipeTransform {

  constructor(
    private familiesQuery: FamiliesQuery
  ) {
  }

  transform(config: TaskUserConfig): number {
    const activeFamily = this.familiesQuery.getActive();
    if (!activeFamily) {
      return 0;
    }

    return activeFamily.taskStrategy === 'per task' ?
      config.completedFamilyTasks.length :
      config.completedFamilyTasks.reduce((prev, curr) => prev + (curr.taskPoint ?? 0), 0);

  }

}
