import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError} from 'rxjs/operators';
import { UserDetail } from './user_detail';
import { environment } from '../../environments/environment'

@Injectable()
export class AuthService {
  private AuthUrl = `${environment['baseUrl']}/users`

  private authSuccessSource = new Subject();

  authSuccess$ = this.authSuccessSource.asObservable()

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message


    // Todo send custom errors with component.
    return throwError(error.error);
  };

  signup(userDetail: UserDetail) : Observable<any> {
    return this.http.post(`${this.AuthUrl}/`, userDetail)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    );
  }

  login(userDetail : UserDetail): Observable<any> {
    return this.http.post(`${this.AuthUrl}/login/`, userDetail)
    .pipe(
      // retry(1),
      catchError(this.handleError)
    )
  }

  logout(): void {
    window.localStorage.removeItem('token')
    this.authSuccessSource.next(false)
  }

  setAuthorizationToken(token: string): void {
    window.localStorage.setItem("token", token)
    this.authSuccessSource.next(true)
  }

  getAuthorizationToken(): string | null {
    return window.localStorage.getItem("token");
  }

  checkAuth() {
    const token = this.getAuthorizationToken()

    if (!token) {
      return false
    }
    const decoded: {exp: number} = jwtDecode(token)
    const currentTime = Date.now()/ 1000
    if (currentTime > decoded.exp) {
      return false
    } else {
      return true
    }
  }
}
