import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit {

  entryForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  })

  isLoggedIn: boolean;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.checkAuth()
  }
  onSubmit() {
    this.toastr.success('You are awesome!', 'Success!');
    console.log(this.entryForm)
  }
}
