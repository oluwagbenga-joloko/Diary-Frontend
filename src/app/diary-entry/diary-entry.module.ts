import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EntryListComponent, EntryDetailComponent]
})
export class DiaryEntryModule { }
