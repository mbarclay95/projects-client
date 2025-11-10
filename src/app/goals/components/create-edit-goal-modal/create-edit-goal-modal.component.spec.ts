import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditGoalModalComponent } from './create-edit-goal-modal.component';

describe('CreateEditGoalModalComponent', () => {
  let component: CreateEditGoalModalComponent;
  let fixture: ComponentFixture<CreateEditGoalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditGoalModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditGoalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
