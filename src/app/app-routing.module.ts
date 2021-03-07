import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutesEnum} from './config/index';
import {AuthGuard} from './guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesEnum.home,
    pathMatch: 'full'
  },
  {
    path: RoutesEnum.home,
    loadChildren: () => import('./pages/home/home-page.module').then((m) => m.HomePageModule)
  },
  {
    path: RoutesEnum.login,
    loadChildren: () => import('./pages/login/login-page.module').then((m) => m.LoginPageModule)
  },
  {
    path: RoutesEnum.teacher,
    loadChildren: () => import('./pages/teacher/teacher-page.module').then((m) => m.TeacherPageModule)
  },
  {
    path: RoutesEnum.subjects,
    loadChildren: () => import('./pages/subjects/subjects-page.module').then((m) => m.SubjectsPageModule)
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
