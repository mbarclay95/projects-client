import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isMobile } from '../../../app.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DraftsFiltersComponent } from '../../components/drafts-filters/drafts-filters.component';
import { MobileDraftsTableComponent } from '../../components/mobile-drafts-table/mobile-drafts-table.component';
import { DraftsTableComponent } from '../../components/drafts-table/drafts-table.component';
import { CreateEditDraftComponent } from '../../components/create-edit-draft/create-edit-draft.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-drafts-page',
  templateUrl: './drafts-page.component.html',
  styleUrls: ['./drafts-page.component.scss'],
  imports: [
    PageHeaderComponent,
    DraftsFiltersComponent,
    MobileDraftsTableComponent,
    DraftsTableComponent,
    CreateEditDraftComponent,
    NzModalModule,
  ],
})
export class DraftsPageComponent {
  isMobile = isMobile;

  readonly draftsStore = inject(DraftsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  async archiveDraft(draftId: number) {
    this.draftsStore.remove({ id: draftId, onSuccess: () => this.nzMessageService.success('Draft archived!') });
  }
}
