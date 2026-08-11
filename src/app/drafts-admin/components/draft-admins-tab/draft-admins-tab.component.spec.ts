import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftAdminsTabComponent } from './draft-admins-tab.component';
import { createDraft } from '../../models/draft.model';

describe('DraftAdminsTabComponent', () => {
  let component: DraftAdminsTabComponent;
  let fixture: ComponentFixture<DraftAdminsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftAdminsTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftAdminsTabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('draft', createDraft({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
