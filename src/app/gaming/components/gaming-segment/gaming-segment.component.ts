import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzSegmentedComponent, NzSegmentedItemComponent, NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { FormsModule } from '@angular/forms';
import { faChessBoard, faMicrochip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gaming-segment',
  imports: [FaIconComponent, NzSegmentedComponent, FormsModule, NzSegmentedItemComponent],
  templateUrl: './gaming-segment.component.html',
  styleUrl: './gaming-segment.component.scss',
})
export class GamingSegmentComponent {
  @Input() set tab(tab: 'sessions' | 'devices') {
    if (tab === 'sessions') {
      this.activeTab = 0;
    } else {
      this.activeTab = 1;
    }
  }
  @Output() tabChanged: EventEmitter<'sessions' | 'devices'> = new EventEmitter<'sessions' | 'devices'>();
  @ViewChild('customSegment', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;
  activeTab = 0;
  sessions = faChessBoard;
  devices = faMicrochip;

  changePage(event: number): void {
    this.tabChanged.emit(event === 0 ? 'sessions' : 'devices');
  }
}
