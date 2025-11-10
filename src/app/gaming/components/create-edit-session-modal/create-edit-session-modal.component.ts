import { Component } from '@angular/core';

import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { GamingSession } from '../../models/gaming-session.model';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzInputNumberLegacyComponent } from 'ng-zorro-antd/input-number-legacy';

@Component({
  selector: 'app-create-edit-session-modal',
  imports: [
    NzInputDirective,
    NzModalComponent,
    ReactiveFormsModule,
    NzModalContentDirective,
    FormsModule,
    NzModalModule,
    NzSwitchComponent,
    NzInputNumberLegacyComponent,
  ],
  templateUrl: './create-edit-session-modal.component.html',
  styleUrl: './create-edit-session-modal.component.scss',
})
export class CreateEditSessionModalComponent extends DefaultModalComponent<GamingSession> {
  constructor(
    private gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService,
  ) {
    super();
  }

  async saveSession(): Promise<void> {
    if (!this.model) {
      return;
    }
    this.saving = true;
    try {
      if (this.model.id === 0) {
        await this.gamingSessionsFacadeService.createSessionPromise(this.model);
      } else {
        await this.gamingSessionsFacadeService.updateSessionPromise(this.model);
      }
    } catch (err) {
      this.nzMessageService.error('There was an error saving the session');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('Session saved!');
    this.saving = false;
    this.isVisible = false;
  }
}
