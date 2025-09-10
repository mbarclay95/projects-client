import { inject, Injectable } from '@angular/core';
import Color from 'colorjs.io';
import { FamiliesSignalStore } from './families-signal-store';

@Injectable({
  providedIn: 'root',
})
export class TaskPointColorsService {
  // startColor = new Color('#A9B31E');
  startColor = new Color('#B6C214');
  // endColor = new Color('#2A59B7');
  endColor = new Color('#127CED');
  range = this.startColor.range(this.endColor, {
    space: 'lch',
    hue: undefined,
    outputSpace: 'srgb',
  });

  readonly familiesStore = inject(FamiliesSignalStore);

  getColor(max: number, min: number, point: number): string {
    if (min === max) {
      return this.endColor.to('srgb').toString();
    }
    return this.range((point - min) / (max - min)).toString();
  }

  getActiveFamilyColor(taskPoint: number): string {
    const min = this.familiesStore.minTaskPoint();
    const max = this.familiesStore.maxTaskPoint();

    if (min === undefined || max === undefined) {
      return '';
    }

    return this.getColor(max, min, taskPoint);
  }
}
