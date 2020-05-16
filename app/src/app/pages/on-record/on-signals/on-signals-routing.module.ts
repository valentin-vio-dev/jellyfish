import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnSignalsPage } from './on-signals.page';

const routes: Routes = [
  {
    path: '',
    component: OnSignalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnSignalsPageRoutingModule {}
