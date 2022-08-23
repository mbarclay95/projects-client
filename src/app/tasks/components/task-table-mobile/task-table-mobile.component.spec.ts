import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableMobileComponent } from './task-table-mobile.component';

describe('TaskTableMobileComponent', () => {
  let component: TaskTableMobileComponent;
  let fixture: ComponentFixture<TaskTableMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTableMobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
