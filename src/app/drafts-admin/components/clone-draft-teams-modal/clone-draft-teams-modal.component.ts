import { Component, inject, input, output } from '@angular/core';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clone-draft-teams-modal',
  templateUrl: './clone-draft-teams-modal.component.html',
  styleUrls: ['./clone-draft-teams-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzSelectComponent, NzOptionComponent, FormsModule],
})
export class CloneDraftTeamsModalComponent extends DefaultModalSignalComponent {
  draftId = input.required<number>();
  closed = output<void>();

  readonly draftsStore = inject(DraftsSignalStore);

  sourceDraftId: number | undefined;

  override onCloseModal(): void {
    this.sourceDraftId = undefined;
  }

  otherDrafts() {
    return this.draftsStore.entities().filter((draft) => draft.id !== this.draftId());
  }

  clone(): void {
    if (!this.sourceDraftId) {
      return;
    }
    this.draftsStore.cloneDraftTeamsHttp({
      draftId: this.draftId(),
      sourceDraftId: this.sourceDraftId,
      onSuccess: () => this.closed.emit(),
    });
  }
}
