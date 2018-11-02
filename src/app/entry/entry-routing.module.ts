import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { AddEntryComponent } from './add-entry/add-entry.component';

import { AuthGuard } from '../auth/auth.guard'

const routes: Routes = [
  { path: '',
    children: [
      { path: 'entry/:id', component: EntryDetailComponent },
      { path: 'entries', component: EntryListComponent },
      { path: 'newentry', component:  AddEntryComponent }
    ],
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
