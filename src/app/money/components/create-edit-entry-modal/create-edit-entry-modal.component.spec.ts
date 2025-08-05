import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditEntryModalComponent } from './create-edit-entry-modal.component';

describe('CreateEditEntryModalComponent', () => {
  let component: CreateEditEntryModalComponent;
  let fixture: ComponentFixture<CreateEditEntryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditEntryModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
