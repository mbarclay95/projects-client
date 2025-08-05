import { Component } from '@angular/core';
import { DefaultModalComponent } from '../../../shared/components/default-modal/default-modal.component';
import { GamingDevice } from '../../models/gaming-device.model';
import { NgIf } from '@angular/common';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzModalComponent, NzModalContentDirective, NzModalModule } from 'ng-zorro-antd/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-create-edit-device-modal',
  standalone: true,
  imports: [
    NgIf,
    NzInputDirective,
    NzModalComponent,
    ReactiveFormsModule,
    FormsModule,
    NzModalContentDirective,
    NzModalModule,
    NzOptionComponent,
    NzSelectComponent,
  ],
  templateUrl: './create-edit-device-modal.component.html',
  styleUrl: './create-edit-device-modal.component.scss',
})
export class CreateEditDeviceModalComponent extends DefaultModalComponent<GamingDevice> {
  constructor(
    private gamingSessionsFacadeService: GamingSessionsFacadeService,
    private nzMessageService: NzMessageService,
  ) {
    super();
  }

  async saveDevice(): Promise<void> {
    if (!this.model) {
      return;
    }
    this.saving = true;
    try {
      if (this.model.id === 0) {
        await this.gamingSessionsFacadeService.createDevicePromise(this.model);
      } else {
        await this.gamingSessionsFacadeService.updateDevicePromise(this.model);
      }
    } catch (err) {
      this.nzMessageService.error('There was an error saving the device');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('Device saved!');
    this.saving = false;
    this.isVisible = false;
  }
}
