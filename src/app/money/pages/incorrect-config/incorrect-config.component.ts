import { Component } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-incorrect-config',
  templateUrl: './incorrect-config.component.html',
  styleUrls: ['./incorrect-config.component.scss'],
  imports: [NzButtonComponent, RouterLink],
})
export class IncorrectConfigComponent {}
