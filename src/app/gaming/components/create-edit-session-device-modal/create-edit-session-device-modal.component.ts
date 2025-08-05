import { Component } from '@angular/core';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { GamingSessionDevice } from '../../models/gaming-session-device.model';
import { NgIf } from '@angular/common';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { SessionDeviceTitlePipe } from '../../pipes/session-device-title.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-edit-session-device-modal',
  standalone: true,
  imports: [
    NgIf,
    NzInputDirective,
    NzModalComponent,
    NzOptionComponent,
    NzSelectComponent,
    ReactiveFormsModule,
    NzModalContentDirective,
    NzModalModule,
    FormsModule,
    SessionDeviceTitlePipe,
  ],
  templateUrl: './create-edit-session-device-modal.component.html',
  styleUrl: './create-edit-session-device-modal.component.scss',
})
export class CreateEditSessionDeviceModalComponent extends DefaultModalComponent<GamingSessionDevice> {
  constructor(
    private gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService,
  ) {
    super();
  }

  async save(): Promise<void> {
    if (!this.model) {
      return;
    }
    this.saving = true;
    const isNew = this.model.id === 0;
    try {
      await (isNew
        ? this.gamingSessionsFacadeService.createSessionDevicePromise(this.model)
        : this.gamingSessionsFacadeService.updateSessionDevicePromise(this.model));
    } catch (error) {
      this.nzMessageService.error(`There was an error ${isNew ? 'connecting to' : 'updating'} the device`);
      this.saving = false;
      return;
    }

    this.nzMessageService.success(`Device ${isNew ? 'connected' : 'updated'}!`);
    this.saving = false;
    this.isVisible = false;
  }
}
