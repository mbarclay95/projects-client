import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSessionDeviceModalComponent } from './create-edit-session-device-modal.component';

describe('CreateEditSessionDeviceModalComponent', () => {
  let component: CreateEditSessionDeviceModalComponent;
  let fixture: ComponentFixture<CreateEditSessionDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditSessionDeviceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditSessionDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
