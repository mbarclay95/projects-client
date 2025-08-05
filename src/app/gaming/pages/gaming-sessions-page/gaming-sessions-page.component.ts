import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CreateEditSessionModalComponent } from '../../components/create-edit-session-modal/create-edit-session-modal.component';
import { GamingSessionsListComponent } from '../../components/gaming-sessions-list/gaming-sessions-list.component';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { SharedModule } from '../../../shared/shared.module';
import { GamingSessionsFacadeService } from '../../services/gaming-sessions-facade.service';
import { merge, Observable, Subject } from 'rxjs';
import { createGamingSession, GamingSession } from '../../models/gaming-session.model';
import { map } from 'rxjs/operators';
import { MobileHeaderService } from '../../../shared/services/mobile-header.service';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-gaming-sessions-page',
  standalone: true,
  imports: [
    AsyncPipe,
    CreateEditSessionModalComponent,
    GamingSessionsListComponent,
    NzSpinComponent,
    SharedModule,
    NzButtonComponent,
  ],
  templateUrl: './gaming-sessions-page.component.html',
  styleUrl: './gaming-sessions-page.component.scss',
})
export class GamingSessionsPageComponent {
  editSession: Subject<GamingSession> = new Subject<GamingSession>();
  createSession: Subject<void> = new Subject<void>();
  openSessionModal$: Observable<GamingSession> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createGamingSession({}))),
    this.createSession.asObservable().pipe(map(() => createGamingSession({}))),
    this.editSession.asObservable(),
  );

  constructor(
    public gamingSessionsFacadeService: GamingSessionsFacadeService,
    private mobileHeaderService: MobileHeaderService,
  ) {}
}
