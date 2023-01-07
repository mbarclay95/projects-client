import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createFolder, Folder} from "../../models/folder.model";
import {FoldersService} from "../../services/folder/state/folders.service";

@Component({
  selector: 'app-create-edit-folder-modal',
  templateUrl: './create-edit-folder-modal.component.html',
  styleUrls: ['./create-edit-folder-modal.component.scss']
})
export class CreateEditFolderModalComponent implements OnInit {
  @Input() openModal!: Observable<Folder>;

  folder?: Folder;
  isVisible = false;
  modalWidth = screen.width < 600 ? '95%' : '500px';

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public foldersService: FoldersService
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(folder => {
      this.folder = folder.id === 0 ? folder : createFolder(folder);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveFolder(): Promise<void> {
    if (!this.folder) {
      return;
    }
    if (this.folder.id === 0) {
      await this.foldersService.createFolder(this.folder);
    } else {
      await this.foldersService.updateFolder(this.folder);
    }

    this.isVisible = false;
  }
}
