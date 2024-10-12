import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedSessionComponent } from './joined-session.component';

describe('JoinedSessionComponent', () => {
  let component: JoinedSessionComponent;
  let fixture: ComponentFixture<JoinedSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinedSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinedSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
