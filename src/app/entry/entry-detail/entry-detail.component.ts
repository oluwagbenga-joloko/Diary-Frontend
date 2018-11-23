import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntryService } from '../entry.service'
import {Entry} from '../entry';
import {ModalService} from '../modal.service';
import { Subscription }   from 'rxjs';


@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.scss']
})
export class EntryDetailComponent implements OnInit {

  entry: Entry;
  deleteSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private entryService: EntryService,
    private modalService : ModalService
    ) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.entryService.getCacheEntry(id).subscribe(
      (entry) => {this.entry = entry; console.log(entry);},
      (error) =>  console.log(error)
    )
    this.deleteSubscription =  this.entryService.getEntriesOnDelete$.subscribe(
      (_) => {
        setTimeout(()=> {
          this.router.navigate(['/entries'])
        }, 10)
      },
    )
  }
  ngOnDestroy() {
    this.deleteSubscription.unsubscribe()

  }
  
  onEditClick() {
    this.router.navigate([`/editEntry/${this.entry.id}`])
  }

  onDeleteClick(id: string) {
    this.modalService.showAsComponent(this.entry.id)
  }
}
