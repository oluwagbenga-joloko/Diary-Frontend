import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';
import { EntryListComponent } from './entry-list/entry-list.component';

import { AuthGuard } from '../auth/auth.guard'

const routes: Routes = [
  { path: 'entry',
    children: [
      { path: 'detail', component: EntryDetailComponent },
      { path: '', component: EntryListComponent }
    ],
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
