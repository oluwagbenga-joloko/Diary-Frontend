import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {DatePipe} from '@angular/common'

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './commons/header/header.component';
import { AppRoutingModule } from './/app-routing.module';
import { EntryModule } from './entry/entry.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthService } from './auth/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './Interceptors/auth-interceptors';
import { NotFoundPageComponent } from './commom/not-found-page/not-found-page.component';
import { HorizonalLoaderComponent } from './commons/horizonal-loader/horizonal-loader.component';



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    NotFoundPageComponent,
    HorizonalLoaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    EntryModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
