import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl , Validators} from '@angular/forms';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import {ModalService} from '../modal.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { ValidateFilterFormDate } from '../../auth/customvalidators'
import { DatePipe } from '@angular/common'
// import { URL } from 'url';




@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries:  Array<Entry> = []
  deleteSubscrption: Subscription;

  maxDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

  filterForm = this.fb.group({
    beginDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  }, {validator: ValidateFilterFormDate})

  sortOptions: {value: string, text: string}[] = [
    {value: "-created_at", text: "date Addded (newest first)"},
    {value: "created_at", text: "date Addded (oldest first)"}
  ]
  params: {[key: string]: string} = {
    order : this.sortOptions[0].value,
    min_created_at:'',
    max_created_at:'',
  }
  isLoading: boolean = false

  nextUrl: string = ''

  noEntries: boolean = false 

  showNoFilter: boolean = false

  showFilterClear: boolean = false


  sortControl = new FormControl(this.sortOptions[0])


  constructor(
    private entryService: EntryService,
    private modalService: ModalService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }


  ngOnInit(): void {
    this.setEntries(this.params, true)
    this.entryService.getEntriesOnDelete$.subscribe(
      (result) => {
        this.setEntries(this.params, false)
      },
    )
    this.sortControl.valueChanges.subscribe((option: {value: string, text: string}) => {
      this.params = {...this.params, order: option.value }
      this.setEntries(this.params, false)
    })
  }

  setEntries(params, isLoading): void {
    if (isLoading) {
      this.isLoading = true
    }
    setTimeout(()=> {
      this.entryService.getEntries(params)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (result) => {
          this.entries = result.results
          this.nextUrl = result.next ? result.next: ''
          this.noEntries = result.results.length == 0
        },
        (error) => console.log(error)
      )


    }, 4000)
  }

  showDeleteModal(id) {
    this.modalService.showAsComponent(id)
  }

  onScroll() {
    if(this.nextUrl) {
      this.isLoading = true
      const page = (new URL(this.nextUrl)).searchParams.get('page')
      this.entryService.getEntries({...this.params, page })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (result) => {
          this.entries = [...this.entries, ...result.results]
          this.nextUrl = result.next ? result.next: ''
        },
        (error) => console.log(error),
        () => this.isLoading = false
      )
    }
  }

  ngOnDestroy() {
  
  }

  get beginDate() { return this.filterForm.get('beginDate') }
  get endDate () { return this.filterForm.get('endDate')}

  onFilter() {
    if (this.filterForm.valid) {
      this.params = {...this.params, 
        min_created_at: this.beginDate.value + 'T00:00:00', 
        max_created_at: this.endDate.value + 'T23:59:59'
      }
      this.entryService.getEntries(this.params).subscribe(
        (result) => {
          this.entries = result.results;
          this.nextUrl = result.next ? result.next: '';
          this.showFilterClear = true
          if(!this.noEntries){
            this.showNoFilter = result.results.length == 0;
          }
        },
        (error) => console.log(error)
      )
    }
  }

  onFilterClear() {
    this.endDate.setValue('');
    this.beginDate.setValue('');
    this.params = {...this.params, 
      min_created_at: '', 
      max_created_at: ''
    }
    this.setEntries(this.params, false)
    this.showFilterClear = false
    this.showNoFilter = false
  }
}
