import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftOrderTabComponent } from './draft-order-tab.component';
import { createDraft } from '../../models/draft.model';

describe('DraftOrderTabComponent', () => {
  let component: DraftOrderTabComponent;
  let fixture: ComponentFixture<DraftOrderTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftOrderTabComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftOrderTabComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('draft', createDraft({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
