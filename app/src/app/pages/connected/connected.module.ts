import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectedPageRoutingModule } from './connected-routing.module';

import { ConnectedPage } from './connected.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectedPageRoutingModule
  ],
  declarations: [ConnectedPage]
})
export class ConnectedPageModule {}
