import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from '../../environments/environment'

import { Entry } from "./entry"

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private entryUrl = `${environment['baseUrl']}/entry`;

  constructor(private http: HttpClient) { }

  addEntry(entry: Entry): Observable<any> {
    return this.http.post(this.entryUrl, entry).pipe(

    )

  }
}
