import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {createMonitorItem, MonitorItem} from '../models/monitor-item.model';
import {createHeartbeatItem, HeartbeatItem, HeartbeatStatus} from '../models/heartbeat-item.model';
import {BehaviorSubject, distinctUntilChanged, Observable, startWith, take, tap, timer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UptimeKumaService {
  private monitorItemsSubject: BehaviorSubject<MonitorItem[]> = new BehaviorSubject<MonitorItem[]>([]);
  downItems$: Observable<MonitorItem[]> = this.monitorItemsSubject.asObservable().pipe(
    map(items => items.filter(item => item.isDown))
  );
  hasDownItems$: Observable<boolean> = this.downItems$.pipe(
    map(items => items.length > 0)
  );
  isConnected$: Observable<boolean> = timer(5000, 60000).pipe(
    map(() => this.socket.connect().connected as boolean),
    distinctUntilChanged(),
    startWith(true),
  );

  constructor(
    private socket: Socket
  ) {
  }

  initSocket(): void {
    this.socket.on('monitorList', (payload: { [key: number]: MonitorItem }) => {
      this.monitorItemsSubject.next(Object.values(payload).map(item => createMonitorItem(item)));
    });

    this.socket.on('heartbeatList', (monitorId: number, payload: HeartbeatItem[]) => {
      const lastHeartbeat = createHeartbeatItem({...{monitorID: monitorId}, ...payload[payload.length - 1]});
      let item = this.findItem(lastHeartbeat.monitorId);
      if (!item) {
        return;
      }
      item.isDown = lastHeartbeat.status !== HeartbeatStatus.up;
      item.lastHeartBeat = lastHeartbeat;
      this.mergeItems(item);
    });

    this.socket.on('heartbeat', (payload: HeartbeatItem) => {
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

  private findItem(monitorId: number): MonitorItem | undefined {
    let monitorItems: MonitorItem[] = [...this.monitorItemsSubject.getValue()];
    const item = monitorItems.find(i => i.id === monitorId);
    if (item) {
      return {...item};
    }

    return undefined;
  }

  private mergeItems(newItem: MonitorItem): void {
    let monitorItems: MonitorItem[] = [...this.monitorItemsSubject.getValue()];
    monitorItems = monitorItems.map(i => {
      if (i.id === newItem.id) {
        return newItem;
      }
      return i;
    });
    this.monitorItemsSubject.next(monitorItems);
  }
}
