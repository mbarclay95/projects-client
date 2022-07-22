import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {RolesQuery} from "../../../users/services/roles/state/roles.query";
import {NzMessageService} from "ng-zorro-antd/message";
import {EventService} from "../../services/event.service";

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
  name: string = '';

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private eventService: EventService,
    public rolesQuery: RolesQuery,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(() => {
      this.name = '';
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async signup() {
    this.nameError = false;
    if (this.name === '') {
      this.nameError = true;
      return;
    }

    this.saving = true;
    try {
      await this.eventService.createEventParticipant(this.name);
    } catch (e) {
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('You are signed up!');
    this.saving = false;
    this.isVisible = false;
  }
}
