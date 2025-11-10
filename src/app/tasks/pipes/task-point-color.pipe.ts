import { inject, Pipe, PipeTransform } from '@angular/core';
import { TaskPointColorsService } from '../services/task-point-colors.service';

@Pipe({ name: 'taskPointColor' })
export class TaskPointColorPipe implements PipeTransform {
  private taskPointColorsService = inject(TaskPointColorsService);

  transform(taskPoint: number): string {
    return this.taskPointColorsService.getActiveFamilyColor(taskPoint);
  }
}
