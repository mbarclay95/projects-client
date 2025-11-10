import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsTableComponent } from './backups-table.component';

describe('BackupsTableComponent', () => {
  let component: BackupsTableComponent;
  let fixture: ComponentFixture<BackupsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
