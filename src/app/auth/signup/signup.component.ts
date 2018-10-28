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
  
  signUpForm = this.fb.group({
    firstName: ['mark', [ Validators.required, Validators.minLength(3) ] ],
    lastName: ['mark', [Validators.required, Validators.minLength(3) ] ],
    email: ['mark@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['markoo', [ Validators.required, validPasswordValidator] ],
    rePassword: ['dfdfdfdf', [ Validators.required ] ],
  }, { validator: samePasswordValidator, updateOn: 'submit'} )

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit() {
  }

  onSubmit() {
    console.log(this.signUpForm)
    if (this.signUpForm.valid) {
      console.log('valid')
    }
    this.authService.signup(this.signUpForm.value)
      .subscribe(
        data => console.log(data),
        error => console.log('hghgh', error)
    )
  }
}
