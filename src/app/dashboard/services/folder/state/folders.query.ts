import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FoldersStore, FolderState } from './folders.store';
import { Observable } from 'rxjs';
import { Folder } from '../../../models/folder.model';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FoldersQuery extends QueryEntity<FolderState> {
  folders$: Observable<Folder[]> = this.selectAll();
  sortedAndFilteredFolders$: Observable<Folder[]> = this.folders$.pipe(
    map((folders) => folders.filter((f) => f.show).sort((a, b) => a.sort - b.sort)),
  );

  gridFormattedFolders$: Observable<Folder[][]> = this.folders$.pipe(
    map((o) => {
      const filterAndSorted = o.filter((f) => f.show).sort((a, b) => a.sort - b.sort);
      const formattedFolders: { column1: Folder[]; column2: Folder[]; column3: Folder[] } = {
        column1: [],
        column2: [],
        column3: [],
      };

      let counter: 1 | 2 | 3 = 1;
      filterAndSorted.forEach((folder) => {
        // @ts-ignore
        formattedFolders['column' + counter].push(folder);
        counter++;
        if (counter > 3) {
          counter = 1;
        }
      });

      return [formattedFolders.column1, formattedFolders.column2, formattedFolders.column3];
    }),
  );

  folderOptions$: Observable<NzSelectOptionInterface[]> = this.folders$.pipe(
    map((folders) =>
      folders.map((folder) => {
        return {
          label: folder.name,
          value: folder.id,
        };
      }),
    ),
  );

  editMode$: Observable<boolean> = this.select('editMode');

  constructor(protected override store: FoldersStore) {
    super(store);
  }

  getEditMode(): boolean {
    return this.getValue().editMode;
  }

  findFolderBySort(sort: number): Folder | undefined {
    return this.getAll().find((f) => f.sort === sort);
  }

  normalizeSort(sort: number): number {
    const maxSort = Math.max(...this.getAll().map((f) => f.sort));
    if (sort > maxSort) {
      sort = 1;
    } else if (sort < 1) {
      sort = maxSort;
    }

    return sort;
  }
}
