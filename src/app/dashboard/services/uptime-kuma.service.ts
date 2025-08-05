import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { createMonitorItem, MonitorItem } from '../models/monitor-item.model';
import { createHeartbeatItem, HeartbeatItem, HeartbeatStatus } from '../models/heartbeat-item.model';
import { BehaviorSubject, distinctUntilChanged, Observable, startWith, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UptimeKumaService extends Socket {
  private monitorItemsSubject: BehaviorSubject<MonitorItem[]> = new BehaviorSubject<MonitorItem[]>([]);
  downItems$: Observable<MonitorItem[]> = this.monitorItemsSubject
    .asObservable()
    .pipe(map((items) => items.filter((item) => item.isActive && item.isDown)));
  isConnected$: Observable<boolean> = timer(5000, 60000).pipe(
    map(() => this.connect().connected as boolean),
    distinctUntilChanged(),
    startWith(true),
  );

  constructor() {
    const config: SocketIoConfig = {
      url: 'wss://uptime-kuma.bigmike.dev/',
      options: {
        transports: ['websocket'],
        reconnectionAttempts: 10,
        autoConnect: false,
      },
    };
    super(config);
  }

  initSocket(): void {
    if (!this.connect().connected) {
      this.connect();
    }
    this.on('monitorList', (payload: { [key: number]: MonitorItem }) => {
      this.monitorItemsSubject.next(Object.values(payload).map((item) => createMonitorItem(item)));
    });

    this.on('heartbeatList', (monitorId: number, payload: HeartbeatItem[]) => {
      const lastHeartbeat = createHeartbeatItem({ ...{ monitorID: monitorId }, ...payload[payload.length - 1] });
      let item = this.findItem(lastHeartbeat.monitorId);
      if (!item) {
        return;
      }
      item.isDown = lastHeartbeat.status !== HeartbeatStatus.up;
      item.lastHeartBeat = lastHeartbeat;
      this.mergeItems(item);
    });

    this.on('heartbeat', (payload: HeartbeatItem) => {
      const heartbeat = createHeartbeatItem(payload);
      let item = this.findItem(heartbeat.monitorId);
      if (!item) {
        return;
      }
      if (heartbeat.status === item.lastHeartBeat?.status) {
        return;
      }
      item.isDown = heartbeat.status !== HeartbeatStatus.up;
      item.lastHeartBeat = heartbeat;
      this.mergeItems(item);
    });
  }

  public disconnectSocket(): void {
    if (this.connect().connected) {
      this.disconnect();
    }
  }

  private findItem(monitorId: number): MonitorItem | undefined {
    let monitorItems: MonitorItem[] = [...this.monitorItemsSubject.getValue()];
    const item = monitorItems.find((i) => i.id === monitorId);
    if (item) {
      return { ...item };
    }

    return undefined;
  }

  private mergeItems(newItem: MonitorItem): void {
    let monitorItems: MonitorItem[] = [...this.monitorItemsSubject.getValue()];
    monitorItems = monitorItems.map((i) => {
      if (i.id === newItem.id) {
        return newItem;
      }
      return i;
    });
    this.monitorItemsSubject.next(monitorItems);
  }
}
