import { Component, OnInit, ViewContainerRef, OnDestroy} from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { EntryService } from '../entry.service'
import { Entry } from '../entry'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss']
})
export class AddEntryComponent implements OnInit, OnDestroy {
  edit: boolean

  entryForm = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]]
  })

  isLoggedIn: boolean;
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private entryService: EntryService,
    private router: Router, 
    private route: ActivatedRoute,
    ) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: {edit: boolean})=> {
        this.edit = data.edit
        if (this.edit) {
          this.fetchData()
        }
      }
    )
  }
  ngOnDestroy() {

  }

  fetchData() {
    let id = this.route.snapshot.paramMap.get('id')
    this.entryService.getCacheEntry(id).subscribe(
      (entry) => {
        console.log(entry)
        this.entryForm.patchValue(entry)
      },
      (error) =>  console.log(error)
      )
  }

  onSubmit() {
    console.log(this.entryForm.invalid)
    if (this.entryForm.invalid) {
      this.toastr.error("you cannot save until you have added a Title and some Content")
    }
    else {
      if (this.edit) {
        this.update()
      } else {
        this.save()
      }
    } 
  }
  save() {
    this.entryService.addEntry(this.entryForm.value).subscribe(
      (result) => {
        this.toastr.success("diary entry saved")
        this.router.navigate(['entries'])
      },
      (error) => {
        console.log(error)
        this.toastr.error("an unknown error has occured please try again later")
      })

  }
  update() {
    let id = this.route.snapshot.paramMap.get('id')
    this.entryService.editEntry(id, this.entryForm.value).subscribe(
      (_) => {
        this.toastr.success("diary entry updated")
        this.router.navigate(['/entry', id],)
      },
      (error) => {
        console.log(error)
        this.toastr.error("an unknown error has occured please try again later")

      }
    )

  }
}
