import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipantModalComponent } from './event-participant-modal.component';

describe('EventParticipantModalComponent', () => {
  let component: EventParticipantModalComponent;
  let fixture: ComponentFixture<EventParticipantModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventParticipantModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
