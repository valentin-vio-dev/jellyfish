import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectedPage } from './connected.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectedPageRoutingModule {}
