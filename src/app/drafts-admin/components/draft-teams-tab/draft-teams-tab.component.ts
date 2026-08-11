import { Component, inject, Input, signal } from '@angular/core';
import { Draft } from '../../models/draft.model';
import { DraftTeam } from '../../models/draft-team.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { isMobile } from '../../../app.component';
import { faEdit, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { CreateEditDraftTeamComponent } from '../create-edit-draft-team/create-edit-draft-team.component';
import { CloneDraftTeamsModalComponent } from '../clone-draft-teams-modal/clone-draft-teams-modal.component';

@Component({
  selector: 'app-draft-teams-tab',
  templateUrl: './draft-teams-tab.component.html',
  styleUrls: ['./draft-teams-tab.component.scss'],
  imports: [
    NzButtonComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    NzEmptyComponent,
    CreateEditDraftTeamComponent,
    CloneDraftTeamsModalComponent,
  ],
})
export class DraftTeamsTabComponent {
  @Input({ required: true }) draft!: Draft;

  isMobile = isMobile;
  edit = faEdit;
  trash = faTrash;
  placeholder = faImage;

  readonly draftsStore = inject(DraftsSignalStore);

  cloneModalOpen = signal(false);

  addTeam(): void {
    this.draftsStore.setDraftIdForNewTeam(this.draft.id);
  }

  editTeam(teamId: number): void {
    this.draftsStore.setSelectedTeam(teamId);
  }

  deleteTeam(team: DraftTeam): void {
    this.draftsStore.deleteDraftTeamHttp({ team });
  }
}
