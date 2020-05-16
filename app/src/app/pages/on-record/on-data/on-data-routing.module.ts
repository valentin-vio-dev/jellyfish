import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnDataPage } from './on-data.page';

const routes: Routes = [
  {
    path: '',
    component: OnDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnDataPageRoutingModule {}
