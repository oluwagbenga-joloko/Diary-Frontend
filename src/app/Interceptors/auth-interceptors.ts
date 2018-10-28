import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service'

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {

	}

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
		const token = this.authService.getAuthorizationToken();
		if (token) {
			console.log(req)
			const authReq = req.clone({setHeaders: { Authorization: token }})
			next.handle(authReq)
			console.log(authReq)
		}
		return next.handle(req);
  }
}