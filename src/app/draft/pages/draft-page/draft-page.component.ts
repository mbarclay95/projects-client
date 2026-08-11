import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { DraftStatus } from '../../models/draft.model';
import { DraftSignupModalComponent } from '../../components/draft-signup-modal/draft-signup-modal.component';
import { DraftOrderComponent } from '../../components/draft-order/draft-order.component';
import { DraftBoardComponent } from '../../components/draft-board/draft-board.component';
import { MyRosterComponent } from '../../components/my-roster/my-roster.component';

@Component({
  selector: 'app-draft-page',
  templateUrl: './draft-page.component.html',
  styleUrls: ['./draft-page.component.scss'],
  imports: [
    AsyncPipe,
    DatePipe,
    NzDividerComponent,
    NzButtonComponent,
    DraftSignupModalComponent,
    DraftOrderComponent,
    DraftBoardComponent,
    MyRosterComponent,
  ],
})
export class DraftPageComponent {
  draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);

  draftStatus = DraftStatus;
  openSignupModal: Subject<void> = new Subject<void>();
}
