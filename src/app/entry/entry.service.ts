import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, throwError, Subject, of } from "rxjs"
import { retry, catchError, map, mergeMap, flatMap, first, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { Entry } from "./entry"

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  entry: Entry;

  private entryUrl = `${environment['baseUrl']}/entries`;


  getEntriesOnDeleteSource = new Subject<{results:Entry[]}>()
  getEntriesOnDelete$ = this.getEntriesOnDeleteSource.asObservable()

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Todo send custom errors with component.
    return throwError(error.error);
  };


  addEntry(entry: Entry): Observable<any> {
    return this.http.post(`${this.entryUrl}/`, entry).pipe(
      map(result => result),
      retry(1),
      catchError(this.handleError)
    )
  }

  getEntries(): Observable<any> {
    return this.http.get<any>(`${this.entryUrl}/`).pipe(
      map(result => {
        if (this.entry) {
          this.entry = undefined
        }
        return result
      }),
      catchError(this.handleError)
    )
  }

  getEntry(id: string): Observable<any> {
    return this.http.get<Entry>(`${this.entryUrl}/${id}/`).pipe(
      catchError(this.handleError)
    )
  }
  
  deleteEntry(id: string): Observable<any> {
    return this.http.delete(`${this.entryUrl}/${id}/`).pipe(
      catchError(this.handleError)
    )
  }
  
  editEntry(id: string, entry: Entry): Observable<any> {
    return this.http.put<Entry>(`${this.entryUrl}/${id}/`, entry).pipe(
      map((result)=> {
        this.entry = result;
        return result;
      }),
      catchError(this.handleError)

    )
  }

  getCacheEntry(id: string): Observable<any> {
    if (!this.entry) {
    return this.getEntry(id).pipe(
      map(
        (entry) => {
          this.entry = entry
          return entry
        },
        (error) => {
          throw(error)
        })
      )
    } else {
      return of(this.entry)
    }
  }
}
