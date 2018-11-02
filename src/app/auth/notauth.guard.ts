import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService }  from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class NotauthGuard implements CanActivate {

  constructor(private router: Router,private authServie: AuthService ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuthenticated = this.authServie.checkAuth()
      if (!isAuthenticated) {
        return true
      }
      this.router.navigate(['/entries'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
