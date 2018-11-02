import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntryRoutingModule } from './entry-routing.module';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AutoResizeDirective } from './auto-resize.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EntryRoutingModule
  ],
  declarations: [EntryDetailComponent, EntryListComponent, AddEntryComponent, AutoResizeDirective, AutoFocusDirective]
})
export class EntryModule { }
