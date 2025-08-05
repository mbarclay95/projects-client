import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { DirectoryItem } from '../../models/directory-item.model';

export interface DirectoryItemsState extends EntityState<DirectoryItem> {
  ui: {
    workingDirectory: {
      sort: number;
      path: string;
    }[];
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'directory-items' })
export class DirectoryItemsStore extends EntityStore<DirectoryItemsState> {
  constructor() {
    super({ ui: { workingDirectory: [] } });
  }
}
