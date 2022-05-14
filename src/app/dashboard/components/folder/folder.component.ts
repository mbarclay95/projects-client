import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Folder} from "../../models/folder.model";
import {createSite, Site} from "../../models/site.model";
import {faChevronLeft, faChevronRight, faEdit, faEllipsisV, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FoldersService} from "../../services/folder/state/folders.service";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {
  @Input() folder!: Folder;
  @Input() editMode!: boolean;

  @Output() openSiteModal: EventEmitter<Site> = new EventEmitter<Site>();
  @Output() openFolderModal: EventEmitter<Folder> = new EventEmitter<Folder>();

  more = faEllipsisV;
  add = faPlus;
  trash = faTrash;
  edit = faEdit;
  left = faChevronLeft;
  right = faChevronRight;

  constructor(
    public foldersService: FoldersService
  ) {
  }

  ngOnInit(): void {
  }

  addNewSite(): void {
    this.openSiteModal.emit(createSite({id: 0, folderId: this.folder.id}));
  }

  dropSite({event}: { event: any }): void {
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;

    const movedSites: { id: number, sort: number }[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.folder.sites.filter(s => {
      if (movedDown) {
        return s.sort <= oldPosition && s.sort >= newPosition;
      } else {
        return s.sort >= oldPosition && s.sort <= newPosition;
      }
    }).forEach(s => {
      if (s.sort === oldPosition) {
        movedSites.push({id: s.id, sort: newPosition});
        this.foldersService.updateSiteCache(this.folder.id, s.id, {sort: newPosition});
      } else {
        movedSites.push({id: s.id, sort: s.sort + (movedDown ? 1 : -1)});
        this.foldersService.updateSiteCache(this.folder.id, s.id, {sort: s.sort + (movedDown ? 1 : -1)});
      }
    });

    void this.foldersService.updateSiteSort(movedSites);
  }

}
