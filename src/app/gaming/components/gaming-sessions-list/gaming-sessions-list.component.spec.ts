import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingSessionsListComponent } from './gaming-sessions-list.component';

describe('GamingSessionsListComponent', () => {
  let component: GamingSessionsListComponent;
  let fixture: ComponentFixture<GamingSessionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingSessionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamingSessionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
