import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { EventsSignalStore } from '../../events/services/events-signal-store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserGroupsSignalStore } from '../services/user-groups-signal-store';
import { TasksSignalStore } from '../../tasks/services/tasks-signal-store';
import { defaultGroceryButtons, defaultTaskButtons, FooterButton } from '../models/footer-button.model';
import { TypedData } from '../../app.routes';
import { UsersSignalStore } from '../../users/services/users-signal-store';
import { createNewUserWithDefaultRole } from '../../users/models/user.model';
import { RolesSignalStore } from '../../users/services/roles-signal-store';
import { GoalsSignalStore } from '../../goals/services/goals-signal-store';
import { IncompleteEntriesSignalStore } from '../../money/services/incomplete-entries-signal-store';
import { DraftsSignalStore } from '../../drafts-admin/services/drafts-signal-store';
import { GroceryItemsSignalStore } from '../../grocery/services/grocery-items-signal-store';

@Injectable({
  providedIn: 'root',
})
export class MobileDisplayService {
  private _title: WritableSignal<string> = signal('');
  title = this._title.asReadonly();

  private _createButtonAction: WritableSignal<CreateButtonAction | undefined> = signal(undefined);
  showCreateButton: Signal<boolean> = computed(() => !!this._createButtonAction());

  private _footerButtons: WritableSignal<MobileFooterButtons | undefined> = signal(undefined);
  footerButtons: Signal<FooterButton[]> = computed(() => {
    switch (this._footerButtons()) {
      case 'tasks':
        return defaultTaskButtons;
      case 'grocery':
        return defaultGroceryButtons;
      default:
        return [];
    }
  });

  private clickedButtonSubject: Subject<void> = new Subject<void>();
  clickedButton$: Observable<void> = this.clickedButtonSubject.asObservable();

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly eventsStore = inject(EventsSignalStore);
  readonly familiesStore = inject(UserGroupsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly usersStore = inject(UsersSignalStore);
  readonly rolesStore = inject(RolesSignalStore);
  readonly goalsStore = inject(GoalsSignalStore);
  readonly incompleteEntriesStore = inject(IncompleteEntriesSignalStore);
  readonly draftsStore = inject(DraftsSignalStore);
  readonly groceryItemsStore = inject(GroceryItemsSignalStore);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const child = this.getDeepestChild(this.route);
      const data = child.snapshot.data as TypedData | undefined;
      if (data?.headerTitle) {
        this.setTitle(data.headerTitle);
      }
      this.setCreateButtonAction(data?.createButtonAction ?? undefined);
      this._footerButtons.set(data?.footerButtons ?? undefined);
    });
  }

  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  setTitle(title: string): void {
    this._title.set(title);
  }

  setCreateButtonAction(action: CreateButtonAction | undefined): void {
    this._createButtonAction.set(action);
  }

  clickedButton(): void {
    switch (this._createButtonAction()) {
      case 'events':
        this.eventsStore.createEntity();
        break;
      case 'user-groups':
        this.familiesStore.createEntity();
        break;
      case 'tasks':
        this.tasksStore.createEntity({
          ownerId: this.familiesStore.activeGroupId(),
          taskPoint: this.familiesStore.minTaskPoint(),
        });
        break;
      case 'users':
        this.usersStore.createEntity(createNewUserWithDefaultRole(this.rolesStore.entities()));
        break;
      case 'goals':
        this.goalsStore.createEntity();
        break;
      case 'transactions':
        this.incompleteEntriesStore.createEntity();
        break;
      case 'drafts':
        this.draftsStore.createEntity();
        break;
      case 'grocery':
        this.groceryItemsStore.createEntity();
        break;
      default:
        this.clickedButtonSubject.next();
    }
  }
}

export type CreateButtonAction =
  | 'goals'
  | 'events'
  | 'file-explorer'
  | 'gaming-sessions'
  | 'tasks'
  | 'user-groups'
  | 'users'
  | 'transactions'
  | 'drafts'
  | 'grocery';
export type MobileFooterButtons = 'tasks' | 'grocery';
