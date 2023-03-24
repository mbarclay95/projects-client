import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createSite, Site} from "../../models/site.model";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {FoldersService} from "../../services/folder/state/folders.service";
import {FoldersQuery} from "../../services/folder/state/folders.query";
import {environment} from "../../../../environments/environment";
import {createSiteImage} from "../../models/site-image.model";
import {NzUploadChangeParam, NzUploadFile} from "ng-zorro-antd/upload";
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-create-edit-site-modal',
  templateUrl: './create-edit-site-modal.component.html',
  styleUrls: ['./create-edit-site-modal.component.scss']
})
export class CreateEditSiteModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Site>;

  fileList: NzUploadFile[] = [];
  site?: Site;
  isVisible = false;
  check = faCheckCircle;
  folderId: number = 0;
  modalWidth = isMobile ? '95%' : '500px';
  modalStyle = isMobile ? {top: '20px'} : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private foldersService: FoldersService,
    public foldersQuery: FoldersQuery,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(site => {
      this.site = site.id === 0 ? site : createSite(site);
      this.folderId = site.folderId;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveSite(): Promise<void> {
    if (!this.site) {
      return;
    }
    if (this.site.id === 0) {
      await this.foldersService.createSite(this.site);
    } else {
      await this.foldersService.updateSite(this.site, this.folderId);
    }

    this.closeModal();
  }

  closeModal(): void {
    this.fileList = [];
    this.isVisible = false;
  }

  getUploadPath(): string {
    return `${environment.apiUrl}/site-images`;
  }

  handleChange({file}: NzUploadChangeParam): void {
    if (!this.site) {
      return;
    }
    const status = file.status;

    if (status === 'done') {
      this.site.siteImage = createSiteImage(file.response);
    }
  }
}
