import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/ng-let.directive';



@NgModule({
  declarations: [
    NgLetDirective
  ],
  exports: [
    NgLetDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
