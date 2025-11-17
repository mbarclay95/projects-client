import { Pipe, PipeTransform } from '@angular/core';
import { IncompleteEntry, isEntryComplete } from '../models/entry.model';

@Pipe({
  name: 'entryDisabled',
})
export class EntryDisabledPipe implements PipeTransform {
  transform(entry?: IncompleteEntry): boolean {
    if (!entry) {
      return true;
    }
    return !isEntryComplete(entry);
  }
}
