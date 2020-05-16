import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnSignalsPageRoutingModule } from './on-signals-routing.module';

import { OnSignalsPage } from './on-signals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnSignalsPageRoutingModule
  ],
  declarations: [OnSignalsPage]
})
export class OnSignalsPageModule {}
