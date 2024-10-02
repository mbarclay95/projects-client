import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {GamingDevicesService} from './services/gaming-devices.service';

export const gamingResolver: ResolveFn<Promise<void>> = async (route, state) => {
  await inject(GamingDevicesService).get();
};
