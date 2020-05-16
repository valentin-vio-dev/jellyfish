import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)},
  {
    path: 'scan',
    loadChildren: () => import('./pages/scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'cloud',
    loadChildren: () => import('./pages/cloud/cloud.module').then( m => m.CloudPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./pages/personal/personal.module').then( m => m.PersonalPageModule)
  },
  {
    path: 'connected',
    loadChildren: () => import('./pages/connected/connected.module').then( m => m.ConnectedPageModule)
  },
  {
    path: 'record-view',
    loadChildren: () => import('./pages/record-view/record-view.module').then( m => m.RecordViewPageModule)
  },
  {
    path: 'on-record',
    loadChildren: () => import('./pages/on-record/on-record.module').then( m => m.OnRecordPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'user/:uid/:prev',
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  },  {
    path: 'follow',
    loadChildren: () => import('./pages/follow/follow.module').then( m => m.FollowPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
