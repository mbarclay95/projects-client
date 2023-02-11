import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {DirectoryItem} from '../../models/directory-item.model';

@Component({
  selector: 'app-file-explorer-page',
  templateUrl: './file-explorer-page.component.html',
  styleUrls: ['./file-explorer-page.component.scss']
})
export class FileExplorerPageComponent implements OnInit {
  isMobile = screen.width < 600;


  openCreateEditModal: Subject<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> =
    new Subject<DirectoryItem & { createOrUpdate: "Create" | "Update" }>();

  constructor() { }

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
