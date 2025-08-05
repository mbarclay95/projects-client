import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDirectoryItemModalComponent } from './create-edit-directory-item-modal.component';

describe('CreateEditDirectoryItemModalComponent', () => {
  let component: CreateEditDirectoryItemModalComponent;
  let fixture: ComponentFixture<CreateEditDirectoryItemModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditDirectoryItemModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDirectoryItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
