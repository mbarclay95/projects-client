import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TargetsQuery } from '../../services/targets/state/targets.query';
import { Target } from '../../models/target.model';

@Component({
  selector: 'app-targets-page',
  templateUrl: './targets-page.component.html',
  styleUrls: ['./targets-page.component.scss'],
  standalone: false,
})
export class TargetsPageComponent implements OnInit {
  @Output() editTarget: EventEmitter<{ target: Target }> = new EventEmitter<{ target: Target }>();

  constructor(public targetsQuery: TargetsQuery) {}

  ngOnInit(): void {}
}
