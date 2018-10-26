import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule
  ],
  declarations: [EntryDetailComponent]
})
export class EntryModule { }
