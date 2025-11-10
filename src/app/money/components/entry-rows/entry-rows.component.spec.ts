import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRowsComponent } from './entry-rows.component';

describe('EntryRowsComponent', () => {
  let component: EntryRowsComponent;
  let fixture: ComponentFixture<EntryRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryRowsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
