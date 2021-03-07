import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {StatusIconPipeModule} from '../../pipes/status-icon';
import {MessageStoreModule} from '../../store/message/message.module';
import {UserStoreModule} from '../../store/user/user.module';
import {ApplySubjectModule} from '../dialogs/apply-subject/apply-subject.module';
import {SchoolSubjectListStudentComponent} from './school-subject-list-student.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    ApplySubjectModule,
    UserStoreModule,
    MessageStoreModule,
    MatIconModule,
    StatusIconPipeModule
  ],
  declarations: [SchoolSubjectListStudentComponent],
  exports: [SchoolSubjectListStudentComponent]
})
export class SchoolSubjectListStudentModule {
}
