import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileDraftsTableComponent } from './mobile-drafts-table.component';

describe('MobileDraftsTableComponent', () => {
  let component: MobileDraftsTableComponent;
  let fixture: ComponentFixture<MobileDraftsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileDraftsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileDraftsTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('drafts', []);
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
