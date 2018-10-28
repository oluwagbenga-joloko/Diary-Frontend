import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule
  ],
  declarations: [EntryDetailComponent, EntryListComponent]
})
export class EntryModule { }
