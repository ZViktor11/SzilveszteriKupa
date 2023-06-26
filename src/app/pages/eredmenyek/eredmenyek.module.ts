import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EredmenyekPageRoutingModule } from './eredmenyek-routing.module';

import { EredmenyekPage } from './eredmenyek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EredmenyekPageRoutingModule
  ],
  declarations: [EredmenyekPage]
})
export class EredmenyekPageModule {}
