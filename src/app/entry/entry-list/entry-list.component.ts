import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Entry } from '../entry';
import {ModalService} from '../modal.service';



@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[]

  constructor(
    private entryService: EntryService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.entryService.getEntries().subscribe(
      (result) => {
        this.entries = result.results
        console.log(this.entries) 
      },
      (error) => console.log(error)
    )
    this.entryService.getEntriesOnDelete$.subscribe(
      (result) => {
        this.entries = result.results
        console.log(this.entries) 
      },
    )
  }

  showDeleteModal(id) {
    this.modalService.showAsComponent(id)
  }

}
