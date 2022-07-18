import { Pipe, PipeTransform } from '@angular/core';
import {TaskUserConfig} from "../../users/models/user.model";

@Pipe({
  name: 'tasksCompleteChartData'
})
export class TasksCompleteChartDataPipe implements PipeTransform {

  transform(config?: TaskUserConfig, ...args: unknown[]): {name: string, value: number}[] {
    if (!config) {
      return [];
    }
    let chartData = [];

    if (config.completedFamilyTasks.length < config.tasksPerWeek) {
      chartData.push({
        name: 'Incomplete',
        value: config.tasksPerWeek - config.completedFamilyTasks.length
      });
    }

    config.completedFamilyTasks.forEach(task => chartData.push({
      name: task.name,
      value: 1
    }));

    return chartData;
  }

}
