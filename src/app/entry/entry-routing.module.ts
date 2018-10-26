import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

const routes: Routes = [
  { path: 'entry', children: [
    { path: '', component: EntryDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
