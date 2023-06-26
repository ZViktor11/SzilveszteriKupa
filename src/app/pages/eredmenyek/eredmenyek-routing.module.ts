import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EredmenyekPage } from './eredmenyek.page';

const routes: Routes = [
  {
    path: '',
    component: EredmenyekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EredmenyekPageRoutingModule {}
