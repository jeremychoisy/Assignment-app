import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule, Routes} from '@angular/router';
import {SchoolSubjectModule} from '../../components/school-subject/school-subject.module';
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
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule, MatButtonModule, AuthGuardModule, MatTabsModule, SchoolSubjectModule],
  declarations: [HomePageComponent],

})
export class HomePageModule {
}
