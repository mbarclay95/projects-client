import { Pipe, PipeTransform } from '@angular/core';
import {Task} from '../models/task.model';

@Pipe({
  name: 'frequencyToString'
})
export class FrequencyToStringPipe implements PipeTransform {

  transform(task: Task): string {
    if (!task.recurring) {
      return '';
    }

    return `${task.frequencyAmount} ${task.frequencyUnit}${task.frequencyAmount === 1 ? '' : 's'}`;
  }

}
