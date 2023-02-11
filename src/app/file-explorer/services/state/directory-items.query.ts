import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {DirectoryItemsStore, DirectoryItemsState} from './directory-items.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DirectoryItem} from '../../models/directory-item.model';

@Injectable({providedIn: 'root'})
export class DirectoryItemsQuery extends QueryEntity<DirectoryItemsState> {
  items$: Observable<DirectoryItem[]> = this.selectAll();

  workingDirectory$: Observable<{ sort: number, path: string }[]> = this.select('ui').pipe(
    map(ui => ui.workingDirectory.sort((a, b) => a.sort - b.sort))
  );

  noWorkingDirectory$: Observable<boolean> = this.select('ui').pipe(
    map(ui => ui.workingDirectory.length === 0)
  );

  constructor(
    protected override store: DirectoryItemsStore
  ) {
    super(store);
  }


  getWorkingDirectory(): { sort: number, path: string }[] {
    return this.getValue().ui.workingDirectory;
  }

  getWorkingDirectoryAsString(): string {
    return [...this.getValue().ui.workingDirectory]
      .sort((a, b) => a.sort - b.sort)
      .map(part => part.path)
      .join('/');
  }

}
