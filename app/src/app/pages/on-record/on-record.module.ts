import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnRecordPageRoutingModule } from './on-record-routing.module';

import { OnRecordPage } from './on-record.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnRecordPageRoutingModule
  ],
  declarations: [OnRecordPage]
})
export class OnRecordPageModule {}
