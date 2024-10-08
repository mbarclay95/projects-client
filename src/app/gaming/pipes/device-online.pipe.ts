import { Pipe, PipeTransform } from '@angular/core';
import {GamingDevice} from '../models/gaming-device.model';
import {differenceInSeconds} from 'date-fns';

@Pipe({
  name: 'deviceOnline',
  standalone: true
})
export class DeviceOnlinePipe implements PipeTransform {

  transform(device: GamingDevice): boolean {
    return differenceInSeconds(new Date(), device.lastSeen) < 120;
  }

}
