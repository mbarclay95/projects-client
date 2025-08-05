import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditFolderModalComponent } from './create-edit-folder-modal.component';

describe('CreateEditFolderModalComponent', () => {
  let component: CreateEditFolderModalComponent;
  let fixture: ComponentFixture<CreateEditFolderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditFolderModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
