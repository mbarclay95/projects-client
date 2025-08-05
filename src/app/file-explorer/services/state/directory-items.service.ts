import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DirectoryItemsStore } from './directory-items.store';
import { firstValueFrom, tap } from 'rxjs';
import { createDirectoryItem, DirectoryItem } from '../../models/directory-item.model';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { setLoading } from '@datorama/akita';
import { WorkingDirectoryItem, workingDirectoryToString } from '../../models/working-directory-item';

@Injectable({ providedIn: 'root' })
export class DirectoryItemsService {
  constructor(
    private directoryItemsStore: DirectoryItemsStore,
    private http: HttpClient,
  ) {}

  async getItems(path: string): Promise<void> {
    await firstValueFrom(
      this.http.get<DirectoryItem[]>(`${environment.apiUrl}/file-explorer/directory-items?path=${path}`).pipe(
        setLoading(this.directoryItemsStore),
        map((items) => items.map((item) => createDirectoryItem(item))),
        tap((items) => this.directoryItemsStore.set(items)),
      ),
    );
  }

  setPath(workingDirectory: { sort: number; path: string }[]): void {
    this.directoryItemsStore.update({ ui: { workingDirectory } });
  }

  appendPath(path: string, workingDirectory: WorkingDirectoryItem[]): void {
    let current = [...workingDirectory];
    current.push({
      sort: current.length + 1,
      path,
    });
    this.setPath(current);
  }

  clickedRoot(): void {
    this.setPath([]);
  }

  clickedWorkingDirectory(newDir: { sort: number; path: string }, workingDirectory: WorkingDirectoryItem[]): void {
    let current = [...workingDirectory];
    current = current.filter((dir) => dir.sort <= newDir.sort);
    this.setPath(current);
  }

  async createDirectory(
    item: DirectoryItem,
    newName: string,
    workingDirectory: WorkingDirectoryItem[],
    refreshAfter = true,
  ): Promise<void> {
    const workingDirectoryString = workingDirectoryToString(workingDirectory);
    await firstValueFrom(
      this.http
        .post<DirectoryItem>(`${environment.apiUrl}/file-explorer/directory-items`, {
          type: item.type,
          newName,
          workingDirectory: workingDirectoryString,
        })
        .pipe(
          map((item) => createDirectoryItem(item)),
          tap((item) => {
            if (refreshAfter) {
              void this.getItems(workingDirectoryString);
            } else {
              this.directoryItemsStore.add(item);
            }
          }),
        ),
    );
  }

  async updateItem(
    item: DirectoryItem,
    workingDirectory: WorkingDirectoryItem[],
    newPath: string,
    mode: 'cp' | 'mv' = 'mv',
    refreshAfter = true,
  ): Promise<void> {
    const workingDirectoryString = workingDirectoryToString(workingDirectory);
    await firstValueFrom(
      this.http
        .patch<DirectoryItem>(`${environment.apiUrl}/file-explorer/directory-items`, {
          ...item,
          ...{
            workingDirectory: workingDirectoryString,
            mode,
            newPath,
          },
        })
        .pipe(
          map((item) => createDirectoryItem(item)),
          tap((newItem) => {
            if (refreshAfter) {
              void this.getItems(workingDirectoryString);
            } else {
              this.directoryItemsStore.update(item.id, newItem);
            }
          }),
        ),
    );
  }

  async deleteItem(item: DirectoryItem, workingDirectory: WorkingDirectoryItem[]): Promise<void> {
    this.directoryItemsStore.remove(item.id);
    const workingDirectoryString = workingDirectoryToString(workingDirectory);
    await firstValueFrom(
      this.http.patch(`${environment.apiUrl}/file-explorer/directory-items/delete`, {
        ...item,
        ...{
          workingDirectory: workingDirectoryString,
        },
      }),
    );
  }
}
