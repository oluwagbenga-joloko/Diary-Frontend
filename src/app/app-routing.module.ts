import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NotauthGuard } from './auth/notauth.guard'


const appRoutes: Routes = [
  { path: '', 
    children: [
      { path: '', component: LandingPageComponent, },
      { path: 'login', component:  LoginComponent, },
      { path: 'signup', component: SignupComponent, }
    ], 
  canActivate: [NotauthGuard]
  }
]
  

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
