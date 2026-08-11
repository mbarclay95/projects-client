import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { isMobile } from '../../../app.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { Draft, DRAFT_STATUS_LABELS, DraftStatus } from '../../models/draft.model';
import { rosterIsFullyOrdered } from '../../models/draft-member.model';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzSegmentedComponent, NzSegmentedItemComponent } from 'ng-zorro-antd/segmented';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzTabsComponent, NzTabComponent } from 'ng-zorro-antd/tabs';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DraftTeamsTabComponent } from '../../components/draft-teams-tab/draft-teams-tab.component';
import { DraftMembersTabComponent } from '../../components/draft-members-tab/draft-members-tab.component';
import { DraftOrderTabComponent } from '../../components/draft-order-tab/draft-order-tab.component';
import { DraftAdminsTabComponent } from '../../components/draft-admins-tab/draft-admins-tab.component';
import { DraftBoardTabComponent } from '../../components/draft-board-tab/draft-board-tab.component';

@Component({
  selector: 'app-draft-detail-page',
  templateUrl: './draft-detail-page.component.html',
  styleUrls: ['./draft-detail-page.component.scss'],
  imports: [
    NzSpinComponent,
    NzSegmentedComponent,
    NzSegmentedItemComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzTooltipDirective,
    NzTabsComponent,
    NzTabComponent,
    NzButtonComponent,
    FaIconComponent,
    RouterLink,
    FormsModule,
    DatePipe,
    NzModalModule,
    DraftTeamsTabComponent,
    DraftMembersTabComponent,
    DraftOrderTabComponent,
    DraftAdminsTabComponent,
    DraftBoardTabComponent,
  ],
})
export class DraftDetailPageComponent {
  isMobile = isMobile;
  statuses = Object.values(DraftStatus);
  statusLabels = DRAFT_STATUS_LABELS;
  back = faChevronLeft;
  warning = faCircleExclamation;

  /** Set by app-draft-order-tab's dirtyChange — read by the Order tab's own label. */
  orderDirty = signal(false);

  readonly draftsStore = inject(DraftsSignalStore);
  private readonly route = inject(ActivatedRoute);
  private readonly nzModalService = inject(NzModalService);

  private readonly draftId = toSignal(this.route.paramMap.pipe(map((params) => Number(params.get('draftId')))));

  /**
   * Mirrors the store's status rather than binding the segmented/select
   * directly to it: ng-zorro's controls paint the clicked option immediately,
   * before `changeStatus()` decides whether to confirm. Resetting through
   * `undefined` on cancel forces a real value change so the control re-syncs
   * to the actual status instead of being stuck showing the unconfirmed pick.
   */
  selectedStatus = signal<DraftStatus | undefined>(undefined);

  constructor() {
    effect(() => {
      const draftId = this.draftId();
      if (draftId) {
        this.draftsStore.setActiveId(draftId);
      }
    });

    effect(() => {
      const draft = this.draftsStore.activeEntity();
      if (draft) {
        this.selectedStatus.set(draft.status);
      }
    });
  }

  canSelectStatus(status: DraftStatus): boolean {
    if (status !== DraftStatus.inProgress) {
      return true;
    }

    const draft = this.draftsStore.activeEntity();
    return !!draft && rosterIsFullyOrdered(draft.draftMembers);
  }

  changeStatus(status: DraftStatus): void {
    const draft = this.draftsStore.activeEntity();
    if (!draft || status === draft.status) {
      return;
    }

    if (draft.status === DraftStatus.inProgress) {
      this.nzModalService.warning({
        nzTitle: 'Are you sure?',
        nzContent: 'Leaving In Progress does not undo any picks already made.',
        nzOkText: 'Change Status',
        nzCancelText: 'Cancel',
        nzOnOk: () => this.commitStatus(draft, status),
        nzOnCancel: () => this.revertSelectedStatus(draft.status),
      });
      return;
    }

    this.commitStatus(draft, status);
  }

  private commitStatus(draft: Draft, status: DraftStatus): void {
    this.draftsStore.update({ entity: { ...draft, status } });
  }

  private revertSelectedStatus(status: DraftStatus): void {
    this.selectedStatus.set(undefined);
    setTimeout(() => this.selectedStatus.set(status));
  }
}
