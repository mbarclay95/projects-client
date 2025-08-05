import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryRowItemComponent } from './entry-row-item.component';

describe('EntryRowItemComponent', () => {
  let component: EntryRowItemComponent;
  let fixture: ComponentFixture<EntryRowItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryRowItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryRowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
