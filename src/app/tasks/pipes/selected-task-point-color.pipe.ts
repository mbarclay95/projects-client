import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedTaskPointColor'
})
export class SelectedTaskPointColorPipe implements PipeTransform {

  transform(currentTaskPoint: number | undefined, taskPoint: number): string {
    if (currentTaskPoint === taskPoint) {
      return `color-1`;
    }

    return 'text-muted';
  }

}
