import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTasksSegmentComponent } from './weekly-tasks-segment.component';

describe('WeeklyTasksSegmentComponent', () => {
  let component: WeeklyTasksSegmentComponent;
  let fixture: ComponentFixture<WeeklyTasksSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyTasksSegmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyTasksSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
