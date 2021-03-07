import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentAuthGuardModule} from '../../guards/student-auth-guard/student-auth-guard.module';
import {StudentAuthGuard} from '../../guards/student-auth-guard/student-auth.guard';
import {SubjectsPageComponent} from './subjects-page.component';
import {SchoolSubjectListStudentModule} from '../../components/school-subject-list-student/school-subject-list-student.module';
import {MessageStoreModule} from '../../store/message/message.module';

const routes: Routes = [
  {
    path: '',
    component: SubjectsPageComponent,
    canActivate: [StudentAuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StudentAuthGuardModule,
    SchoolSubjectListStudentModule,
    MessageStoreModule
  ],
  declarations: [SubjectsPageComponent],
})
export class SubjectsPageModule {
}
