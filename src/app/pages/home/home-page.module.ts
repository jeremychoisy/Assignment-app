import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RouterModule, Routes} from '@angular/router';
import {SchoolSubjectComponent} from '../../components/school-subject/school-subject.component';
import {AuthGuardModule} from '../../guards/auth-guard/auth-guard.module';
import {AuthGuard} from '../../guards/auth-guard/auth.guard';
import {HomePageComponent} from './home-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule, MatButtonModule, AuthGuardModule],
  declarations: [HomePageComponent, SchoolSubjectComponent],
  exports: [
    SchoolSubjectComponent
  ]
})
export class HomePageModule {
}
