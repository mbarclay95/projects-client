import { Component, effect, inject } from '@angular/core';
import { filter, merge, Observable, Subject } from 'rxjs';
import { DirectoryItem } from '../../models/directory-item.model';
import { map } from 'rxjs/operators';
import { MobileDisplayService } from '../../../shared/services/mobile-display.service';
import { isMobile } from '../../../app.component';
import { WorkingDirectoryItem } from '../../models/working-directory-item';
import { DirectoryItemsSignalStore } from '../../services/directory-items-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DirectoriesFilesListComponent } from '../../components/directories-files-list/directories-files-list.component';
import { CreateEditDirectoryItemModalComponent } from '../../components/create-edit-directory-item-modal/create-edit-directory-item-modal.component';

@Component({
  selector: 'app-file-explorer-page',
  templateUrl: './file-explorer-page.component.html',
  styleUrls: ['./file-explorer-page.component.scss'],
  imports: [PageHeaderComponent, DirectoriesFilesListComponent, CreateEditDirectoryItemModalComponent],
})
export class FileExplorerPageComponent {
  isMobile = isMobile;

  openCreateEditModal: Subject<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> = new Subject<
    DirectoryItem & { createOrUpdate: 'Create' | 'Update' }
  >();

  openCreateEditModal$: Observable<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(
        () =>
          ({
            id: '',
            type: 'dir',
            createOrUpdate: 'Create',
          }) as DirectoryItem & { createOrUpdate: 'Create' | 'Update' },
      ),
    ),
    this.openCreateEditModal.asObservable(),
  ).pipe(filter(() => !this.newLocationBeingSelected));
  newLocationSelected: Subject<WorkingDirectoryItem[] | undefined> = new Subject<WorkingDirectoryItem[] | undefined>();

  newLocationBeingSelected?: WorkingDirectoryItem[];
  readonly directoryItemsStore = inject(DirectoryItemsSignalStore);

  constructor(private mobileHeaderService: MobileDisplayService) {
    effect(() => {
      this.directoryItemsStore.setQueryString(this.directoryItemsStore.buildQueryString());
      this.directoryItemsStore.loadAll({});
    });
  }

  newLocationSelectedOrCanceled(newLocation: WorkingDirectoryItem[]): void {
    this.directoryItemsStore.updateUiState({ workingDirectory: newLocation });
    this.newLocationBeingSelected = undefined;
    setTimeout(() => this.newLocationSelected.next(newLocation), 100);
  }

  createNewDirectory(): void {
    this.openCreateEditModal.next({
      id: '',
      type: 'dir',
      createOrUpdate: 'Create',
    });
  }
}
