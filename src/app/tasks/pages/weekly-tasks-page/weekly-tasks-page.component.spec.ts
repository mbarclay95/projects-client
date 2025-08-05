import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTasksPageComponent } from './weekly-tasks-page.component';

describe('WeeklyTasksPageComponent', () => {
  let component: WeeklyTasksPageComponent;
  let fixture: ComponentFixture<WeeklyTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklyTasksPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
