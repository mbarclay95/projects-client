import {Pipe, PipeTransform} from '@angular/core';
import {TaskPoint} from '../models/task-point.model';

@Pipe({
  name: 'taskPointColor'
})
export class TaskPointColorPipe implements PipeTransform {

  transform(currentTaskPoint: TaskPoint | undefined, taskPoint: TaskPoint): string {
    if (currentTaskPoint?.id === taskPoint.id) {
      return `color-1`;
    }

    return 'text-muted';
  }

}
