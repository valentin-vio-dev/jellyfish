import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnMediaPageRoutingModule } from './on-media-routing.module';

import { OnMediaPage } from './on-media.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnMediaPageRoutingModule
  ],
  declarations: [OnMediaPage]
})
export class OnMediaPageModule {}
