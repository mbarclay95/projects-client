import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledBackupsPageComponent } from './scheduled-backups-page.component';

describe('ScheduledBackupsPageComponent', () => {
  let component: ScheduledBackupsPageComponent;
  let fixture: ComponentFixture<ScheduledBackupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledBackupsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledBackupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
