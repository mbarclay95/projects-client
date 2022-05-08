import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBackupsDrawerComponent } from './create-edit-backups-drawer.component';

describe('CreateEditBackupsDrawerComponent', () => {
  let component: CreateEditBackupsDrawerComponent;
  let fixture: ComponentFixture<CreateEditBackupsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditBackupsDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditBackupsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
