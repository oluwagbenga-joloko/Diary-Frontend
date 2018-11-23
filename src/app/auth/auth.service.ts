import { Injectable, OnInit, NgZone } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http'
import { Observable, throwError, Subject, from, observable,of } from 'rxjs';
import { retry, catchError, mergeMap, map} from 'rxjs/operators';
import { UserDetail, GoogleAuthResult } from './user_detail';
import { environment } from '../../environments/environment'



declare var gapi: any;

@Injectable()
export class AuthService implements OnInit{
  public googleAuth2;

  private AuthUrl = `${environment['baseUrl']}/users`

  private authSuccessSource = new Subject();

  authSuccess$ = this.authSuccessSource.asObservable()

  constructor(private http: HttpClient, public ngZone: NgZone) {
    this.initGoogleAuth2()
  }

  ngOnInit() {
    console.log('init')
  }

  initGoogleAuth2() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
         client_id: "243590877731-6h1r030vmc9lp3gk76fb4gmgefv0nopt.apps.googleusercontent.com",
         ux_mode: "popup"
       }).then((auth2) => {
         this.ngZone.run(() => {
          this.googleAuth2 = auth2
         })
       },
       (err)=> {
         console.log(err)
       })
   });
  }

  googleAuth() {
    return from(this.googleAuth2.signIn({
      prompt: "select_account"
    })).pipe(
      mergeMap((result: GoogleAuthResult) => {
        return this.verifyOnBackend(result.Zi.id_token)
      }) 
    )
  }


  verifyOnBackend(idToken) {
    return this.http.post(`${this.AuthUrl}/tokenauth/`, {idToken: idToken})
    .pipe(
      retry(1),
      catchError(this.handleError)
    );


  }

  googlelogin() {


    // console.log(this.googleAuth2)
    console.log(this.googleAuth2.isSignedIn.get())
    if (this.googleAuth2.isSignedIn.get()) {
      let currentUser = this.googleAuth2.currentUser.get()
      console.log("before log out", currentUser)
      this.googleAuth2.signOut().then((res)=> {
        // this.googleAuth2.disconnect()
        console.log(res)
        let currentUser = this.googleAuth2.currentUser.get()
        // currentUser.disconnect()
       console.log("after logout",this.googleAuth2.currentUser.get())
      },
      (err) => {
        console.log(err)
      }
      
      )

    } else {
    }

  }



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
