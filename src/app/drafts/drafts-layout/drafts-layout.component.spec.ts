import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsLayoutComponent } from './drafts-layout.component';

describe('DraftsLayoutComponent', () => {
  let component: DraftsLayoutComponent;
  let fixture: ComponentFixture<DraftsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftsLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
