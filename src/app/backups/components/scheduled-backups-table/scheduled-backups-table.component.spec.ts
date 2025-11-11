import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledBackupsTableComponent } from './scheduled-backups-table.component';

describe('ScheduledBackupsTableComponent', () => {
  let component: ScheduledBackupsTableComponent;
  let fixture: ComponentFixture<ScheduledBackupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledBackupsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledBackupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
