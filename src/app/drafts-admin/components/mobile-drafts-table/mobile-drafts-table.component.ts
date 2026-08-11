import { Component, inject, input, output } from '@angular/core';
import { Draft, DRAFT_STATUS_COLORS, DRAFT_STATUS_LABELS } from '../../models/draft.model';
import { faBoxArchive, faCopy, faEdit, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-mobile-drafts-table',
  templateUrl: './mobile-drafts-table.component.html',
  styleUrls: ['./mobile-drafts-table.component.scss'],
  imports: [NzSpinComponent, FaIconComponent, NzPopconfirmDirective, NzTagComponent, NzEmptyComponent, DatePipe],
})
export class MobileDraftsTableComponent {
  private router = inject(Router);
  private clipboard = inject(Clipboard);
  private nzMessageService = inject(NzMessageService);

  drafts = input.required<Draft[]>();
  loading = input.required<boolean>();

  editDraft = output<number>();
  archiveDraft = output<number>();

  edit = faEdit;
  archive = faBoxArchive;
  copy = faCopy;
  open = faUpRightFromSquare;

  statusLabels = DRAFT_STATUS_LABELS;
  statusColors = DRAFT_STATUS_COLORS;

  openDraft(draftId: number): void {
    this.router.navigate(['/app/drafts', draftId]);
  }

  copyToClipboard(draft: Draft): void {
    this.clipboard.copy(`${window.location.protocol}//${window.location.host}${draft.draftUrl}`);
    this.nzMessageService.success('Draft link copied!');
  }
}
