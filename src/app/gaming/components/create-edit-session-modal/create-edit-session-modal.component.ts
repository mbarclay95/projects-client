import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from 'ng-zorro-antd/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DefaultModalComponent} from '../../../shared/components/default-modal/default-modal.component';
import {GamingSession} from '../../models/gaming-session.model';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {GamingSessionsFacadeService} from '../../services/gaming-sessions-facade.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzSwitchComponent} from 'ng-zorro-antd/switch';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-create-edit-session-modal',
  standalone: true,
  imports: [
    NgIf,
    NzInputDirective,
    NzModalComponent,
    ReactiveFormsModule,
    NzModalContentDirective,
    FormsModule,
    NzModalModule,
    NzSelectComponent,
    NzOptionComponent,
    NzSwitchComponent,
    NzInputNumberComponent,
  ],
  templateUrl: './create-edit-session-modal.component.html',
  styleUrl: './create-edit-session-modal.component.scss'
})
export class CreateEditSessionModalComponent extends DefaultModalComponent<GamingSession> {

  constructor(
    private gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService,
  ) {
    super();
  }

  async saveSession(): Promise<void> {
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
