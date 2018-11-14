import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryService } from '../entry.service'
import {Entry} from '../entry';
import {ModalService} from '../modal.service';


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

  entry: Entry;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private entryService: EntryService,
    private modalService : ModalService
    ) {

  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.entryService.getCacheEntry(id).subscribe(
      (entry) => {this.entry = entry; console.log(entry);},
      (error) =>  console.log(error)
    )
  }
  
  onEditClick() {
    this.router.navigate([`/editEntry/${this.entry.id}`])
  }

  onDeleteClick(id: string) {
    this.modalService.showAsComponent(this.entry.id)
  }
}
