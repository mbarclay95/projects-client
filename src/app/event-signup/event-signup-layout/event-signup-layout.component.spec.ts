import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSignupLayoutComponent } from './event-signup-layout.component';

describe('EventSignupLayoutComponent', () => {
  let component: EventSignupLayoutComponent;
  let fixture: ComponentFixture<EventSignupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSignupLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventSignupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
