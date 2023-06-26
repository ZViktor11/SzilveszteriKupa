import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CsapatPageRoutingModule } from './csapat-routing.module';

import { CsapatPage } from './csapat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CsapatPageRoutingModule
  ],
  declarations: [CsapatPage]
})
export class CsapatPageModule {}
