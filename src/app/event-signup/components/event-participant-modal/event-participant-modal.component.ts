import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {RolesQuery} from "../../../users/services/roles/state/roles.query";
import {NzMessageService} from "ng-zorro-antd/message";
import {EventService} from "../../services/event.service";
import {faThumbsDown, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {EventCacheService} from "../../services/event-cache.service";
import {EventParticipant} from "../../models/event-participant";

@Component({
  selector: 'app-event-participant-modal',
  templateUrl: './event-participant-modal.component.html',
  styleUrls: ['./event-participant-modal.component.scss']
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

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private eventService: EventService,
    private eventCacheService: EventCacheService,
    public rolesQuery: RolesQuery,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(() => {
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
