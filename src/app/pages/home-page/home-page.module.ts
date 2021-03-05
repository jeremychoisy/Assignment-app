import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SchoolSubjectComponent} from '../../components/school-subject/school-subject.component';
import {AuthGuard} from '../../guards/auth-guard/auth.guard';
import {HomePageComponent} from './home-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule, MatButtonModule],
  declarations: [HomePageComponent, SchoolSubjectComponent],
})
export class HomePageModule {
}
