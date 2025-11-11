import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteEntriesComponent } from './incomplete-entries.component';

describe('IncompleteEntriesComponent', () => {
  let component: IncompleteEntriesComponent;
  let fixture: ComponentFixture<IncompleteEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncompleteEntriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncompleteEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
