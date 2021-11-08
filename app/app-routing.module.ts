import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OwnersListComponent } from './owners-list/owners-list.component';
import { OwnerComponent } from './owner/owner.component';

const routes: Routes = [
  { path: '', component: OwnersListComponent },
  { path: 'new', component: OwnerComponent },
  { path: ':ownerId', component: OwnerComponent },
  { path: ':ownerId/edit', component: OwnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
