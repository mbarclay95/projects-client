import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { createFamily, Family } from '../../models/family.model';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { isMobile } from '../../../app.component';
import { UsersSignalStore } from '../../../users/services/users-signal-store';

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss'],
  standalone: false,
})
export class FamiliesPageComponent implements OnInit {
  @Output() openFamilyModal: EventEmitter<Family> = new EventEmitter<Family>();

  isMobile = isMobile;
  createEditFamily: Observable<Family> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createFamily({}))),
    this.openFamilyModal.asObservable(),
  );
  readonly usersStore = inject(UsersSignalStore);

  constructor(
    public familiesQuery: FamiliesQuery,
    private mobileHeaderService: MobileHeaderService,
  ) {}

  ngOnInit(): void {}
}
