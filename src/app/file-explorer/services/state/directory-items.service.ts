import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DirectoryItemsStore } from './directory-items.store';
import {firstValueFrom, tap} from 'rxjs';
import {createDirectoryItem, DirectoryItem} from '../../models/directory-item.model';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {DirectoryItemsQuery} from './directory-items.query';
import {setLoading} from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class DirectoryItemsService {

  constructor(
    private directoryItemsStore: DirectoryItemsStore,
    private directoryItemsQuery: DirectoryItemsQuery,
    private http: HttpClient
  ) {
  }

  async getItems(): Promise<void> {
    const path = encodeURI(this.directoryItemsQuery.getWorkingDirectoryAsString());
    await firstValueFrom(this.http.get<DirectoryItem[]>(`${environment.apiUrl}/file-explorer/directory-items?path=${path}`).pipe(
      setLoading(this.directoryItemsStore),
      map(items => items.map(item => createDirectoryItem(item))),
      tap(items => this.directoryItemsStore.set(items))
    ));
  }

  private setPath(workingDirectory: {sort: number, path: string}[]): void {
    this.directoryItemsStore.update({ui: {workingDirectory}});
  }

  appendPath(path: string): void {
    let current = [...this.directoryItemsQuery.getWorkingDirectory()];
    current.push({
      sort: current.length + 1,
      path
    });
    this.setPath(current);
  }

  clickedRoot(): void {
    this.setPath([]);
  }

  clickedWorkingDirectory(newDir: {sort: number, path: string}): void {
    let current = [...this.directoryItemsQuery.getWorkingDirectory()];
    current = current.filter(dir => dir.sort <= newDir.sort);
    this.setPath(current);
  }

  async createDirectory(item: (DirectoryItem & {newName: string})): Promise<void> {
    const workingDirectory = this.directoryItemsQuery.getWorkingDirectoryAsString();
    await firstValueFrom(this.http.post<DirectoryItem>(`${environment.apiUrl}/file-explorer/directory-items`, {
      ...item,
      ...{
        workingDirectory
      }
    }).pipe(
      map(item => createDirectoryItem(item)),
      tap(item => this.directoryItemsStore.add(item))
    ));
  }
}
