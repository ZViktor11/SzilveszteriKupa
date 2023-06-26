import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsapatPage } from './csapat.page';

const routes: Routes = [
  {
    path: '',
    component: CsapatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsapatPageRoutingModule {}
