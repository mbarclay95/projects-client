import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralFrequency',
})
export class PluralFrequencyPipe implements PipeTransform {
  transform(amount?: number): string {
    return amount && amount > 1 ? 's' : '';
  }
}
