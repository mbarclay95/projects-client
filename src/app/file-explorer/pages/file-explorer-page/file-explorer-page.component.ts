import { Component, OnInit } from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {DirectoryItem} from '../../models/directory-item.model';
import {map} from 'rxjs/operators';
import {MobileHeaderService} from '../../../shared/services/mobile-header.service';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-file-explorer-page',
  templateUrl: './file-explorer-page.component.html',
  styleUrls: ['./file-explorer-page.component.scss']
})
export class FileExplorerPageComponent implements OnInit {
  isMobile = isMobile;

  openCreateEditModal: Subject<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> =
    new Subject<DirectoryItem & { createOrUpdate: "Create" | "Update" }>();

  openCreateEditModal$: Observable<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => ({
        id: '',
        type: 'dir',
        createOrUpdate: 'Create'
      } as (DirectoryItem & { createOrUpdate: 'Create' | 'Update'})))
    ),
    this.openCreateEditModal.asObservable()
  );

  constructor(
    private mobileHeaderService: MobileHeaderService
  ) { }

  ngOnInit(): void {
  }

  createNewDirectory(): void {
    this.openCreateEditModal.next({
      id: '',
      type: 'dir',
      createOrUpdate: 'Create'
    });
  }

}
