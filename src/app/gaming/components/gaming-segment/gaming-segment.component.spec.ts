import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingSegmentComponent } from './gaming-segment.component';

describe('GamingSegmentComponent', () => {
  let component: GamingSegmentComponent;
  let fixture: ComponentFixture<GamingSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingSegmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamingSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
