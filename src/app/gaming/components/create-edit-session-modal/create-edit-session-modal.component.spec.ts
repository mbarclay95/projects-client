import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSessionModalComponent } from './create-edit-session-modal.component';

describe('CreateEditSessionModalComponent', () => {
  let component: CreateEditSessionModalComponent;
  let fixture: ComponentFixture<CreateEditSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditSessionModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
