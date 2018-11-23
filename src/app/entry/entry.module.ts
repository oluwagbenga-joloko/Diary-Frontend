import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { EntryRoutingModule } from './entry-routing.module';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AutoResizeDirective } from './auto-resize.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { BarLoaderComponent } from '../commons/bar-loader/bar-loader.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryRoutingModule,
    InfiniteScrollModule,
  ],
  declarations: [EntryDetailComponent, EntryListComponent, AddEntryComponent, AutoResizeDirective, AutoFocusDirective, DeleteModalComponent, BarLoaderComponent],
  entryComponents: [DeleteModalComponent]
})
export class EntryModule { }
