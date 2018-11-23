import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { EntryService } from '../entry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {

  constructor (
    private entryService: EntryService,
    private toastr: ToastrService
  ) { }
  @Input() id: string

  ngOnInit() {
  }
  
  delete() {
    this.entryService.deleteEntry(this.id).subscribe(
      (_) => {
        this.closed.next()
        this.toastr.success("entry deleted succesfully")
        this.entryService.getEntriesOnDeleteSource.next(this.id)
      }
      // {
      //   this.entryService.getEntries().subscribe(
      //     (result) => {
      //       this.entryService.getEntriesOnDeleteSource.next(result)
      //       this.toastr.success("entry deleted succesfully")
      //     },
      //     (error) => console.log(error),
      //     () => {
      //       this.closed.next()
      //     }
      //   )
      // }
      ,
      (error) => {
        this.closed.next()
        console.log(error)
        this.toastr.error("an unknown error has occured please try again later")
      }
  )}

  @Output()
  closed = new EventEmitter()
}
