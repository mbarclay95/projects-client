import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTabsComponent } from './task-tabs.component';

describe('TaskTabsComponent', () => {
  let component: TaskTabsComponent;
  let fixture: ComponentFixture<TaskTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
