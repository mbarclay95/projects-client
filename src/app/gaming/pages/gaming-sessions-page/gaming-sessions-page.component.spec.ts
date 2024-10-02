import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingSessionsPageComponent } from './gaming-sessions-page.component';

describe('GamingSessionsPageComponent', () => {
  let component: GamingSessionsPageComponent;
  let fixture: ComponentFixture<GamingSessionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingSessionsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamingSessionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
