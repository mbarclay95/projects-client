import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsPageComponent } from './targets-page.component';

describe('TargetsPageComponent', () => {
  let component: TargetsPageComponent;
  let fixture: ComponentFixture<TargetsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TargetsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
