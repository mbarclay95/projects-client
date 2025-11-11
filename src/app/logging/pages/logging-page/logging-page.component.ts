import { Component, inject } from '@angular/core';
import { LogEventsSignalStore } from '../../services/log-events-signal-store';

@Component({
  selector: 'app-logging-page',
  templateUrl: './logging-page.component.html',
  styleUrls: ['./logging-page.component.scss'],
})
export class LoggingPageComponent {
  readonly logEventsStore = inject(LogEventsSignalStore);
}
