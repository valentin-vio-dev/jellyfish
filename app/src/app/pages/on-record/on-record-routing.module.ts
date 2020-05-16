import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnRecordPage } from './on-record.page';

const routes: Routes = [
  {
    path: '',
    component: OnRecordPage,
    children: [
      {
        path: 'signals-tab',
        loadChildren: () => import('./on-signals/on-signals.module').then( m => m.OnSignalsPageModule)
      },
      {
        path: 'data-tab',
        loadChildren: () => import('./on-data/on-data.module').then( m => m.OnDataPageModule)
      },
      {
        path: 'media-tab',
        loadChildren: () => import('./on-media/on-media.module').then( m => m.OnMediaPageModule)
      },
      {
        path: '',
        redirectTo: '/on-record/signals-tab',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnRecordPageRoutingModule {}
