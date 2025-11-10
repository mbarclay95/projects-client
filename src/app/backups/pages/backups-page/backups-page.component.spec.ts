import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsPageComponent } from './backups-page.component';

describe('BackupsPageComponent', () => {
  let component: BackupsPageComponent;
  let fixture: ComponentFixture<BackupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackupsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
