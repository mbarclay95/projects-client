import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EventService } from '../../services/event.service';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { EventCacheService } from '../../services/event-cache.service';
import { EventParticipant } from '../../models/event-participant';
import { isMobile } from '../../../app.component';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-event-participant-modal',
  templateUrl: './event-participant-modal.component.html',
  styleUrls: ['./event-participant-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    FaIconComponent,
  ],
})
export class EventParticipantModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<void>;

  isVisible: boolean = false;
  saving = false;
  nameError = false;
  goingError = false;
  name: string = '';
  isGoing?: boolean;
  thumbsUp = faThumbsUp;
  thumbsDown = faThumbsDown;
  modalWidth = isMobile ? '95%' : '500px';
  modalStyle = isMobile ? { top: '20px' } : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private eventService: EventService,
    private eventCacheService: EventCacheService,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe(() => {
      this.name = '';
      this.isGoing = undefined;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async signup() {
    this.nameError = false;
    this.goingError = false;
    if (this.name === '') {
      this.nameError = true;
      return;
    }
    if (this.isGoing === undefined) {
      this.goingError = true;
      return;
    }

    this.saving = true;
    let participant: EventParticipant;
    try {
      participant = await this.eventService.createEventParticipant(this.name, this.isGoing);
    } catch (e) {
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }

    this.eventCacheService.loadNewParticipantIntoCache(this.eventService.getId(), participant);
    this.nzMessageService.success('You are signed up!');
    this.saving = false;
    this.isVisible = false;
  }
}
