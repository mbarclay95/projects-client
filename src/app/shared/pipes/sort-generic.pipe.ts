import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortGeneric',
  standalone: true,
})
export class SortGenericPipe implements PipeTransform {
  transform<T extends { sort: number }>(models: T[]): T[] {
    return [...models].sort((a, b) => a.sort - b.sort);
  }
}
