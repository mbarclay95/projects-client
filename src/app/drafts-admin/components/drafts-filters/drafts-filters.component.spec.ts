import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftsFiltersComponent } from './drafts-filters.component';

describe('DraftsFiltersComponent', () => {
  let component: DraftsFiltersComponent;
  let fixture: ComponentFixture<DraftsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftsFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
