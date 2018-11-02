import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService } from "../auth.service";
import { UserDetail } from "../user_detail";

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

  constructor(private router: Router,
    private activatedRoute : ActivatedRoute, 
    private fb: FormBuilder,
    private authService: AuthService
    ) { 

  }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe( data => {
      console.log(data)
      if (this.errors["nonFieldErrors"]) {
        delete this.errors["nonFieldErrors"]
      }
    })
  }

  onSubmit() {
    console.log(this.loginForm)
    this.authService.login(this.loginForm.value)
    .subscribe((data: { token: string}) => {
      this.authService.setAuthorizationToken(data.token)
      this.router.navigate(['/entries'])
    },
    error => {
      console.log(error)
      this.errors = error
      console.log(this.errors)
      }
    )
  }

  get email() { return this.loginForm.get('email') }
  
  get password() { return this.loginForm.get('password') }

}
