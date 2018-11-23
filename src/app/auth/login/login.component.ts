import { Component, OnInit, NgZone } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from "../auth.service";
import { UserDetail } from "../user_detail";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errors = {};

  loginForm = this.fb.group({
    email: ['mark3@gmai.com', [Validators.required, Validators.email]],
    password: ['mark2@gmail.com', [Validators.required, Validators.minLength(4)]]
  })

  isLoading: boolean = false

  constructor(private router: Router,
    private activatedRoute : ActivatedRoute, 
    private fb: FormBuilder,
    public authService: AuthService,
    public ngZone: NgZone
    ) { 
  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe( data => {
      if (this.errors["nonFieldErrors"]) {
        delete this.errors["nonFieldErrors"]
      }
    })
  }

  LoginSubscribeObj = {
    next: (data: { token: string}) => {
      this.ngZone.run(()=> {
        this.authService.setAuthorizationToken(data.token)
        this.router.navigate(['/entries'])
      })
    },
    error: error => {
      this.errors = error
      }
  }

  onSubmit() {
    this.isLoading = true
    this.authService.login(this.loginForm.value)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(this.LoginSubscribeObj)}

  get email() { return this.loginForm.get('email') }
  
  get password() { return this.loginForm.get('password') }

  googleButtonPress() {
    this.isLoading = true
    this.authService.googleAuth()
    .pipe(finalize(() => this.isLoading = false))
    .subscribe(this.LoginSubscribeObj)
  }
}
