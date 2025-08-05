import { Component, OnInit } from '@angular/core';
import { MobileFooterService } from '../../services/mobile-footer.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-footer',
  templateUrl: './mobile-footer.component.html',
  styleUrls: ['./mobile-footer.component.scss'],
  standalone: false,
})
export class MobileFooterComponent implements OnInit {
  currentRoute$?: Observable<string>;

  constructor(
    public mobileFooterService: MobileFooterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentRoute$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).url),
    );
  }
}
