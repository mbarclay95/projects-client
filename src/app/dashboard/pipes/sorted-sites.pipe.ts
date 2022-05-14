import { Pipe, PipeTransform } from '@angular/core';
import {FoldersQuery} from "../services/folder/state/folders.query";
import {Folder} from "../models/folder.model";
import {Observable} from "rxjs";
import {Site} from "../models/site.model";
import {map} from "rxjs/operators";

@Pipe({
  name: 'sortedSites'
})
export class SortedSitesPipe implements PipeTransform {

  constructor(
    private foldersQuery: FoldersQuery
  ) {
  }

  transform(folder: Folder): Observable<Site[]> {
    return this.foldersQuery.editMode$.pipe(
      map(editMode => folder.sites.filter(s => editMode ? true : s.show).sort((a, b) => a.sort - b.sort))
    );
  }

}
