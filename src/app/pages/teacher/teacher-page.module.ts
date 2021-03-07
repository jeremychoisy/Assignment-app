import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule, Routes} from '@angular/router';
import {AssignmentsAddModule} from '../../components/assignments-add/assignments-add.module';
import {RootAssignmentsListModule} from '../../components/root-assignments-list/root-assignments-list.module';
import {SchoolSubjectListTeacherModule} from '../../components/school-subject-list-teacher/school-subject-list-teacher.module';
import {SchoolSubjectsAddModule} from '../../components/school-subjects-add/school-subjects-add.module';
import {StudentListBySchoolSubjectModule} from '../../components/student-list-by-school-subject/student-list-by-school-subject.module';
import {TeacherAuthGuardModule} from '../../guards/teacher-auth-guard/teacher-auth-guard.module';
import {TeacherAuthGuard} from '../../guards/teacher-auth-guard/teacher-auth.guard';
import {MessageStoreModule} from '../../store/message/message.module';
import {UserStoreModule} from '../../store/user/user.module';
import {TeacherPageComponent} from './teacher-page.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherPageComponent,
    canActivate: [TeacherAuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    AssignmentsAddModule,
    SchoolSubjectsAddModule,
    TeacherAuthGuardModule,
    UserStoreModule,
    MessageStoreModule,
    StudentListBySchoolSubjectModule,
    RootAssignmentsListModule,
    SchoolSubjectListTeacherModule
  ],
  declarations: [TeacherPageComponent],
})
export class TeacherPageModule {}
