import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralFrequency'
})
export class PluralFrequencyPipe implements PipeTransform {

  transform(amount?: number, ...args: unknown[]): string {
    return amount && amount > 1 ? 's' : '';
  }

}
