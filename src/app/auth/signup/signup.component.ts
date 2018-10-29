import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { samePasswordValidator, validPasswordValidator } from '../customvalidators'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errors: {} = {};

  signUpForm = this.fb.group({
    firstName: ['mark', [ Validators.required, Validators.minLength(3) ] ],
    lastName: ['mark', [Validators.required, Validators.minLength(3) ] ],
    email: ['mark@gmail.com', [ Validators.required, Validators.email ] ],
    passwordGroup: this.fb.group({
      password: ['markoo', [ Validators.required, validPasswordValidator] ],
      rePassword: ['dfdfdfdf', [ Validators.required ] ]},
      { validator: samePasswordValidator, updateOn: 'submit'
    })
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signUpForm)
    if (this.signUpForm.valid) {
      console.log('valid')
    }
    this.authService.signup({...this.signUpForm.value, 
      ...this.signUpForm.value.passwordGroup})
      .subscribe(
        data => console.log(data),
        error => {
          console.log(error)
          this.errors = error
          console.log(this.errors)
        }
    )
  }
  onEmailBlur() {
    console.log('dfdfdfdfdf')
    if (this.errors["email"]) {
      delete this.errors["email"]
    }
  }
  get firstName() { return this.signUpForm.get('firstName'); }

  get lastName() { return this.signUpForm.get('lastName'); }

  get email() { return this.signUpForm.get('email'); }

  get password() { return this.signUpForm.get('passwordGroup').get('password') }

  get rePassword() { return this.signUpForm.get('passwordGroup').get('rePassword'); }

  get passwordGroup() { return this.signUpForm.get('passwordGroup') }

}
