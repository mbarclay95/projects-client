import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDayButtonComponent } from './goal-day-button.component';

describe('GoalDayButtonComponent', () => {
  let component: GoalDayButtonComponent;
  let fixture: ComponentFixture<GoalDayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoalDayButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoalDayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
