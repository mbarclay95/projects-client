import { Pipe, PipeTransform } from '@angular/core';
import {differenceInDays, endOfDay, startOfDay} from "date-fns";

@Pipe({
  name: 'dueDateHumanReadable'
})
export class DueDateHumanReadablePipe implements PipeTransform {

  transform(dueDate?: Date, ...args: unknown[]): string {
    if (!dueDate) {
      return '';
    }

    const diffInDays = differenceInDays(dueDate, startOfDay(new Date()));

    if (diffInDays > 1) {
      return `in ${diffInDays} days`;
    }
    if (diffInDays === 1) {
      return 'tomorrow';
    }
    if (diffInDays === 0) {
      return 'today';
    }
    if (diffInDays === -1) {
      return 'yesterday';
    }

    return `${diffInDays * -1} days ago`;
  }

}
