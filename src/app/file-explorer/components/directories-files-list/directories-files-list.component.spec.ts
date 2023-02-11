import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoriesFilesListComponent } from './directories-files-list.component';

describe('DirectoriesFilesListComponent', () => {
  let component: DirectoriesFilesListComponent;
  let fixture: ComponentFixture<DirectoriesFilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectoriesFilesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoriesFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
