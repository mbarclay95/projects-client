import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Bank } from '../../../models/bank.model';
import { BanksStore } from './banks.store';

@Injectable({ providedIn: 'root' })
export class BanksService {

  constructor(private banksStore: BanksStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Bank[]>('https://api.com').pipe(tap(entities => {
      this.banksStore.set(entities);
    }));
  }

  add(bank: Bank) {
    this.banksStore.add(bank);
  }

  update(id, bank: Partial<Bank>) {
    this.banksStore.update(id, bank);
  }

  remove(id: ID) {
    this.banksStore.remove(id);
  }

}
