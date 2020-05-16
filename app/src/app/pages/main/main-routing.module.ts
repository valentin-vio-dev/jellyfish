import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'scan-tab',
        loadChildren: () => import('../scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'settings-tab',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      },
      {
        path: 'cloud-tab',
        loadChildren: () => import('../cloud/cloud.module').then( m => m.CloudPageModule)
      },
      {
        path: 'follow-tab',
        loadChildren: () => import('../follow/follow.module').then( m => m.FollowPageModule)
      },
      {
        path: '',
        redirectTo: '/main/scan-tab',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
