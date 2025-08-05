import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditScheduledBackupDrawerComponent } from './create-edit-scheduled-backup-drawer.component';

describe('CreateEditScheduledBackupDrawerComponent', () => {
  let component: CreateEditScheduledBackupDrawerComponent;
  let fixture: ComponentFixture<CreateEditScheduledBackupDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditScheduledBackupDrawerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditScheduledBackupDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
