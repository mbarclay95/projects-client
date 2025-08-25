import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { EventsSignalStore } from '../../events/services/events-signal-store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TypedData } from '../../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class MobileHeaderService {
  _title: WritableSignal<string> = signal('');
  title = this._title.asReadonly();

  _createButtonAction: WritableSignal<CreateButtonAction | undefined> = signal(undefined);
  showCreateButton: Signal<boolean> = computed(() => !!this._createButtonAction());

  private clickedButtonSubject: Subject<void> = new Subject<void>();
  clickedButton$: Observable<void> = this.clickedButtonSubject.asObservable();

  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly eventsStore = inject(EventsSignalStore);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const child = this.getDeepestChild(this.route);
      const data = child.snapshot.data as TypedData | undefined;
      if (data?.headerTitle) {
        this.setTitle(data.headerTitle);
      }
      this.setCreateButtonAction(data?.createButtonAction ?? undefined);
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
    if (this._createButtonAction() === 'events') {
      this.eventsStore.setSelectedEntity(0);
    } else {
      this.clickedButtonSubject.next();
    }
  }
}

export type CreateButtonAction = 'goals' | 'events' | 'file-explorer' | 'gaming-sessions' | 'tasks' | 'families' | 'users';
