import { Pipe, PipeTransform } from '@angular/core';
import { Goal } from '../models/goal.model';

@Pipe({
  name: 'pluralizeGoal',
})
export class PluralizeGoalPipe implements PipeTransform {
  transform(amount: number | null, goal: Goal): string {
    if (amount === null || amount !== 1) {
      return goal.pluralUnit ?? '';
    }

    return goal.singularUnit ?? '';
  }
}
