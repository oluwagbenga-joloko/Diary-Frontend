import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component:  LoginComponent },
  { path: 'signup', component: SignupComponent }
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
