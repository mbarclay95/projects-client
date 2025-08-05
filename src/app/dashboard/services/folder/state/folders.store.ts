import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Folder } from '../../../models/folder.model';

export interface FolderState extends EntityState<Folder> {
  editMode: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'folder' })
export class FoldersStore extends EntityStore<FolderState> {
  constructor() {
    super({ editMode: false });
  }
}
