import { Directive, ElementRef, EventEmitter, Input, Output, OnDestroy, inject } from '@angular/core';
import { filter, fromEvent, merge, of, Subscription, switchMap } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Directive({ selector: '[appLongPress]' })
export class LongPressDirective implements OnDestroy {
  private readonly eventSubscribe: Subscription;
  @Input() threshold = 500;

  @Output() mouseLongPress = new EventEmitter();

  private readonly elementRef = inject(ElementRef);

  constructor() {
    const mousedown = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => true), // turn on threshold counter
    );
    const touchstart = fromEvent(this.elementRef.nativeElement, 'touchstart').pipe(map(() => true));
    const touchEnd = fromEvent(this.elementRef.nativeElement, 'touchend').pipe(map(() => false));
    const mouseup = fromEvent<MouseEvent>(window, 'mouseup').pipe(
      filter((event) => event.button == 0), // Only allow left button (Primary button)
      map(() => false), // reset threshold counter
    );
    this.eventSubscribe = merge(mousedown, mouseup, touchstart, touchEnd)
      .pipe(
        debounceTime(this.threshold),
        switchMap((state) => (state ? of(true) : of(null))),
        filter((value) => !!value),
      )
      .subscribe(() => this.mouseLongPress.emit());
  }

  ngOnDestroy(): void {
    if (this.eventSubscribe) {
      this.eventSubscribe.unsubscribe();
    }
  }
}
