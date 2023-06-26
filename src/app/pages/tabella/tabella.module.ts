import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabellaPageRoutingModule } from './tabella-routing.module';

import { TabellaPage } from './tabella.page';
import { RouterModule } from '@angular/router';
import { NavbarPageModule } from '../navbar/navbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabellaPageRoutingModule,RouterModule,NavbarPageModule
  ],
  declarations: [TabellaPage]
})
export class TabellaPageModule {}
