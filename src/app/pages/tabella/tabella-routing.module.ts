import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabellaPage } from './tabella.page';

const routes: Routes = [
  {
    path: '',
    component: TabellaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabellaPageRoutingModule {}
