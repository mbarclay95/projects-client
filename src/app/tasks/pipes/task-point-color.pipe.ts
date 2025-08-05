import { Pipe, PipeTransform } from '@angular/core';
import { TaskPointColorsService } from '../services/task-point-colors.service';

@Pipe({
  name: 'taskPointColor',
})
export class TaskPointColorPipe implements PipeTransform {
  constructor(private taskPointColorsService: TaskPointColorsService) {}

  transform(taskPoint: number): string {
    return this.taskPointColorsService.getActiveFamilyColor(taskPoint);
  }
}
