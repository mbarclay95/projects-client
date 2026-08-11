import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftSignupModalComponent } from './draft-signup-modal.component';

describe('DraftSignupModalComponent', () => {
  let component: DraftSignupModalComponent;
  let fixture: ComponentFixture<DraftSignupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftSignupModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftSignupModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('openModal', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
