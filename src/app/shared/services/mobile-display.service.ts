import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { EventsSignalStore } from '../../events/services/events-signal-store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FamiliesSignalStore } from '../../tasks/services/families-signal-store';
import { TasksSignalStore } from '../../tasks/services/tasks-signal-store';
import { defaultTaskButtons, FooterButton, taskFamiliesButton } from '../models/footer-button.model';
import { Permissions } from '../../auth/permissions';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { TypedData } from '../../app.routes';
import { UsersSignalStore } from '../../users/services/users-signal-store';
import { createNewUserWithDefaultRole } from '../../users/models/user.model';
import { RolesSignalStore } from '../../users/services/roles-signal-store';
import { GoalsSignalStore } from '../../goals/services/goals-signal-store';

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
      case 'tasks': {
        const footerButtons = [...defaultTaskButtons];
        if (this.authStore.hasPermissionTo(Permissions.FAMILIES_TAB)) {
          footerButtons.push({ ...taskFamiliesButton });
        }
        return footerButtons;
      }
      default:
        return [];
    }
  });

  private clickedButtonSubject: Subject<void> = new Subject<void>();
  clickedButton$: Observable<void> = this.clickedButtonSubject.asObservable();

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly eventsStore = inject(EventsSignalStore);
  readonly familiesStore = inject(FamiliesSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly authStore = inject(AuthSignalStore);
  readonly usersStore = inject(UsersSignalStore);
  readonly rolesStore = inject(RolesSignalStore);
  readonly goalsStore = inject(GoalsSignalStore);

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
      case 'families':
        this.familiesStore.createEntity();
        break;
      case 'tasks':
        this.tasksStore.createEntity({
          ownerId: this.familiesStore.activeFamilyId(),
          taskPoint: this.familiesStore.minTaskPoint(),
        });
        break;
      case 'users':
        this.usersStore.createEntity(createNewUserWithDefaultRole(this.rolesStore.entities()));
        break;
      case 'goals':
        this.goalsStore.createEntity();
        break;
      default:
        this.clickedButtonSubject.next();
    }
  }
}

export type CreateButtonAction = 'goals' | 'events' | 'file-explorer' | 'gaming-sessions' | 'tasks' | 'families' | 'users';
export type MobileFooterButtons = 'tasks';
