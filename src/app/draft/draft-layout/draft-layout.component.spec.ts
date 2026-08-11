import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftLayoutComponent } from './draft-layout.component';

describe('DraftLayoutComponent', () => {
  let component: DraftLayoutComponent;
  let fixture: ComponentFixture<DraftLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
