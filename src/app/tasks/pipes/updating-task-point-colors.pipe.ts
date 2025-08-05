import { Pipe, PipeTransform } from '@angular/core';
import { TaskPointColorsService } from '../services/task-point-colors.service';

@Pipe({
  name: 'updatingTaskPointColors',
  standalone: false,
})
export class UpdatingTaskPointColorsPipe implements PipeTransform {
  constructor(private taskPointColorsService: TaskPointColorsService) {}

  transform(taskPoints: number[], taskPoint: number): string {
    const max = Math.max(...taskPoints);
    const min = Math.min(...taskPoints);

    return this.taskPointColorsService.getColor(max, min, taskPoint);
  }
}
