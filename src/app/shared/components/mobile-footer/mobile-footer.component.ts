import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MobileDisplayService } from '../../services/mobile-display.service';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss'],
  standalone: false,
})
export class MobileFooterComponent implements OnInit {
  currentRoute$?: Observable<string>;

  readonly mobileDisplayService = inject(MobileDisplayService);
  readonly router = inject(Router);

  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).url),
    );
  }
}
