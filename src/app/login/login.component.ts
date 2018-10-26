import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
  }

  onClick() {
    console.log('dfdfdfdfdf')
    console.log(this.router)
    console.log(this.activatedRoute)
    this.router.navigate(['/entry'])
  }

}
