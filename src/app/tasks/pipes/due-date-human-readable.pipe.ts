import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, differenceInMonths, differenceInWeeks, differenceInYears, startOfToday } from 'date-fns';

@Pipe({ name: 'dueDateHumanReadable' })
export class DueDateHumanReadablePipe implements PipeTransform {
  transform(dueDate?: Date): string {
    if (!dueDate) {
      return '';
    }

    const today = startOfToday();
    let dateDiff = differenceInDays(dueDate, today);

    if (dateDiff === 1) {
      return 'tomorrow';
    }
    if (dateDiff === 0) {
      return 'today';
    }
    if (dateDiff === -1) {
      return 'yesterday';
    }
    const absoluteDays = Math.abs(dateDiff);
    let unit = 'day';
    if (absoluteDays > 365) {
      unit = 'year';
      dateDiff = differenceInYears(dueDate, today);
    } else if (absoluteDays > 30) {
      unit = 'month';
      dateDiff = differenceInMonths(dueDate, today);
    } else if (absoluteDays > 7) {
      unit = 'week';
      dateDiff = differenceInWeeks(dueDate, today);
    }

    if (dateDiff < 0) {
      dateDiff = Math.abs(dateDiff);
      return `${dateDiff} ${unit}${dateDiff === 1 ? '' : 's'} ago`;
    }

    return `in ${dateDiff} ${unit}${dateDiff === 1 ? '' : 's'}`;

    // if (diffInDays > 1) {
    //   return `in ${diffInDays} days`;
    // }
    // if (diffInDays > -7) {
    //   return `${diffInDays * -1} days ago`;
    // }
    //
    // const numOfWeeks = Math.floor(diffInDays / -7);
    //
    // return `${numOfWeeks} week${numOfWeeks === 1 ? '' : 's'} ago`;
  }
}
