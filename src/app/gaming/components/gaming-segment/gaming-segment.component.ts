import {Component, EventEmitter, Input, Output, TemplateRef, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NzSegmentedComponent, NzSegmentedOption, NzSegmentedOptions} from 'ng-zorro-antd/segmented';
import {FormsModule} from '@angular/forms';
import {faChessBoard, faMicrochip} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gaming-segment',
  standalone: true,
  imports: [
    AsyncPipe,
    FaIconComponent,
    NgIf,
    NzSegmentedComponent,
    FormsModule
  ],
  templateUrl: './gaming-segment.component.html',
  styleUrl: './gaming-segment.component.scss'
})
export class GamingSegmentComponent {
  @Input() set tab (tab: 'sessions' | 'devices') {
    if (tab === 'sessions') {
      this.activeTab = 0;
    } else {
      this.activeTab = 1;
    }
  }
  @Output() tabChanged: EventEmitter<'sessions' | 'devices'> = new EventEmitter<"sessions" | "devices">();
  @ViewChild('customSegment', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;
  activeTab = 0;
  pages: NzSegmentedOptions = [
    {
      label: 'Sessions',
      value: 0,
      useTemplate: true,
      className: 'testing-class'
    },
    {
      label: 'Devices',
      value: 1,
      useTemplate: true
    },
  ];
  sessions = faChessBoard;
  devices = faMicrochip;

  changePage(event: number): void {
    this.tabChanged.emit(event === 0 ? 'sessions' : 'devices');
  }
}
