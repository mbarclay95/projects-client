import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDraftComponent } from './create-edit-draft.component';

describe('CreateEditDraftComponent', () => {
  let component: CreateEditDraftComponent;
  let fixture: ComponentFixture<CreateEditDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditDraftComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
