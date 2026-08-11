import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftDetailPageComponent } from './draft-detail-page.component';

describe('DraftDetailPageComponent', () => {
  let component: DraftDetailPageComponent;
  let fixture: ComponentFixture<DraftDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftDetailPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
