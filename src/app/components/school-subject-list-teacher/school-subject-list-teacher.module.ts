import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MessageStoreModule} from '../../store/message/message.module';
import {UserStoreModule} from '../../store/user/user.module';
import {SchoolSubjectEditModule} from '../dialogs/school-subject-edit/school-subject-edit.module';
import {SchoolSubjectListTeacherComponent} from './school-subject-list-teacher.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SchoolSubjectEditModule,
    UserStoreModule,
    MessageStoreModule
  ],
  declarations: [SchoolSubjectListTeacherComponent],
  exports: [SchoolSubjectListTeacherComponent]
})
export class SchoolSubjectListTeacherModule {
}
