import { Pipe, PipeTransform } from '@angular/core';
import {GamingSessionDevice} from '../models/gaming-session-device.model';

@Pipe({
  name: 'sessionDeviceTitle',
  standalone: true
})
export class SessionDeviceTitlePipe implements PipeTransform {

  transform(sessionDevice: GamingSessionDevice | undefined): string {
    if (!sessionDevice) {
      return '';
    }

    if (sessionDevice.id === 0) {
      return `Connect to the ${sessionDevice.gamingDevice.buttonColor} device`;
    }

    return 'Update your name';
  }

}
