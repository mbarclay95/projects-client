import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTargetModalComponent } from './create-edit-target-modal.component';

describe('CreateEditTargetModalComponent', () => {
  let component: CreateEditTargetModalComponent;
  let fixture: ComponentFixture<CreateEditTargetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTargetModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTargetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
