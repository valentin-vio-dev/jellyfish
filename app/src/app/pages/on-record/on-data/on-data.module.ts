import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnDataPageRoutingModule } from './on-data-routing.module';

import { OnDataPage } from './on-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnDataPageRoutingModule
  ],
  declarations: [OnDataPage]
})
export class OnDataPageModule {}
