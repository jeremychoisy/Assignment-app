import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesEnum} from './models/enums/index';

const routes: Routes = [
  {
    path: RoutesEnum.home,
    loadChildren: () => import('./pages/home-page/home-page.module').then((m) => m.HomePageModule)
  },
  {
    path: RoutesEnum.login,
    loadChildren: () => import('./pages/login/login-page.module').then((m) => m.LoginPageModule)
  },
  {
    path: '**',
    redirectTo: RoutesEnum.home,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
