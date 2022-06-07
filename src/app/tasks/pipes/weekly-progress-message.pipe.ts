import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weeklyProgressMessage'
})
export class WeeklyProgressMessagePipe implements PipeTransform {

  transform(percent: number): string {
    if (percent === 0) {
      return 'Get your rear in gear,';
    }
    if (percent < 25) {
      return 'That\'s a good start,';
    }
    if (percent < 50) {
      return 'Keep it up,';
    }
    if (percent < 75) {
      return 'Nice work,';
    }
    if (percent < 99) {
      return 'You\'re awesome,';
    }

    return 'Yay! All done,';
  }

}
