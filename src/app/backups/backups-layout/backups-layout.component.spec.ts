import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsLayoutComponent } from './backups-layout.component';

describe('BackupsLayoutComponent', () => {
  let component: BackupsLayoutComponent;
  let fixture: ComponentFixture<BackupsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackupsLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
