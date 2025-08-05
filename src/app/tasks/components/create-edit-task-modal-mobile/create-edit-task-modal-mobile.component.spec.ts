import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskModalMobileComponent } from './create-edit-task-modal-mobile.component';

describe('CreateEditTaskModalMobileComponent', () => {
  let component: CreateEditTaskModalMobileComponent;
  let fixture: ComponentFixture<CreateEditTaskModalMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditTaskModalMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskModalMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
