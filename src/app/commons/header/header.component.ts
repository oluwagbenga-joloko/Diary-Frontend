import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  showSubmenu: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) {

    }

  ngOnInit() {
    this.isLoggedIn = this.authService.checkAuth()
    this.authService.authSuccess$.subscribe(
      (isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn
      }
    )
  }

  onBarsClick() {
    this.showSubmenu = !this.showSubmenu;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showSubmenu = false;
  }
}
