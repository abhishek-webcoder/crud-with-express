import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { UserlistComponent } from './userlist.component';

const routes: Routes = [
  { path: '', component: UserlistComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserlistRoutingModule { }
