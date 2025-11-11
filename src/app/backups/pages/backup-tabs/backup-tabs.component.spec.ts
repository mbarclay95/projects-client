import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupTabsComponent } from './backup-tabs.component';

describe('BackupTabsComponent', () => {
  let component: BackupTabsComponent;
  let fixture: ComponentFixture<BackupTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupTabsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
