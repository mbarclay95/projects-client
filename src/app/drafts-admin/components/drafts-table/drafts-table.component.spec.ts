import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsTableComponent } from './drafts-table.component';

describe('DraftsTableComponent', () => {
  let component: DraftsTableComponent;
  let fixture: ComponentFixture<DraftsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('drafts', []);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
