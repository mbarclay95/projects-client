import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFamilyModalComponent } from './create-edit-family-modal.component';

describe('CreateEditFamilyModalComponent', () => {
  let component: CreateEditFamilyModalComponent;
  let fixture: ComponentFixture<CreateEditFamilyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditFamilyModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFamilyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
