import { Component, OnInit } from '@angular/core';
import { filter, merge, Observable, shareReplay, Subject, tap } from 'rxjs';
import { DirectoryItem } from '../../models/directory-item.model';
import { map } from 'rxjs/operators';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { isMobile } from '../../../app.component';
import { WorkingDirectoryItem, workingDirectoryToString } from '../../models/working-directory-item';
import { DirectoryItemsQuery } from '../../services/state/directory-items.query';
import { DirectoryItemsService } from '../../services/state/directory-items.service';

@Component({
  selector: 'app-file-explorer-page',
  templateUrl: './file-explorer-page.component.html',
  styleUrls: ['./file-explorer-page.component.scss'],
})
export class FileExplorerPageComponent implements OnInit {
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

  workingDirectory$: Observable<WorkingDirectoryItem[]> = this.directoryItemsQuery.workingDirectory$.pipe(
    tap((workingDirectory) => this.directoryItemsService.getItems(workingDirectoryToString(workingDirectory))),
    shareReplay(),
  );

  newLocationBeingSelected?: WorkingDirectoryItem[];

  constructor(
    private mobileHeaderService: MobileHeaderService,
    private directoryItemsQuery: DirectoryItemsQuery,
    private directoryItemsService: DirectoryItemsService,
  ) {}

  ngOnInit(): void {}

  newLocationSelectedOrCanceled(newLocation?: WorkingDirectoryItem[]): void {
    this.directoryItemsService.setPath(this.newLocationBeingSelected!);
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
