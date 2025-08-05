import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { RolesQuery } from '../../../users/services/roles/state/roles.query';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EventsService } from '../../services/events/state/events.service';
import { EventParticipant } from '../../models/event-participant';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-edit-participant-modal',
  templateUrl: './edit-participant-modal.component.html',
  styleUrls: ['./edit-participant-modal.component.scss'],
  standalone: false,
})
export class EditParticipantModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<EventParticipant>;

  isVisible: boolean = false;
  saving = false;
  nameError = false;
  eventParticipant?: EventParticipant;
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;
  modalWidth = isMobile ? '95%' : '500px';
  modalStyle = isMobile ? { top: '20px' } : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private eventsService: EventsService,
    public rolesQuery: RolesQuery,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((participant) => {
      this.eventParticipant = { ...participant };
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async signup() {
    if (!this.eventParticipant) {
      return;
    }

    this.nameError = false;
    if (this.eventParticipant.name === '') {
      this.nameError = true;
      return;
    }
    this.saving = true;
    try {
      await this.eventsService.updateParticipant(this.eventParticipant);
    } catch (e) {
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('Participant Updated');
    this.saving = false;
    this.isVisible = false;
  }
}
