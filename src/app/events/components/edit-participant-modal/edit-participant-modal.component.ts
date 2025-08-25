import { Component, inject } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EventParticipant } from '../../models/event-participant';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { EventsSignalStore } from '../../services/events-signal-store';

@Component({
  selector: 'app-edit-participant-modal',
  templateUrl: './edit-participant-modal.component.html',
  styleUrls: ['./edit-participant-modal.component.scss'],
  standalone: false,
})
export class EditParticipantModalComponent extends DefaultModalSignalComponent<EventParticipant> {
  nameError = false;
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;

  readonly eventsStore = inject(EventsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  signup(): void {
    if (!this.model) {
      return;
    }

    this.nameError = false;
    if (this.model.name === '') {
      this.nameError = true;
      return;
    }

    this.eventsStore.updateParticipant({ participant: this.model, onSuccess: () => this.participantSaved() });
  }

  private participantSaved(): void {
    this.nzMessageService.success('Participant Updated');
    this.eventsStore.clearSelectedParticipant();
  }
}
