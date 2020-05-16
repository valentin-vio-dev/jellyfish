import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnMediaPage } from './on-media.page';

const routes: Routes = [
  {
    path: '',
    component: OnMediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnMediaPageRoutingModule {}
