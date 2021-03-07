import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {StatusIconPipeModule} from '../../pipes/status-icon';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {UpdateStudentStatusModule} from '../update-student-status/update-student-status.module';
import {StudentListBySchoolSubjectComponent} from './student-list-by-school-subject.component';

@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule, MatTableModule, MatProgressSpinnerModule, StatusIconPipeModule, MatIconModule, UpdateStudentStatusModule],
  declarations: [StudentListBySchoolSubjectComponent],
  exports: [StudentListBySchoolSubjectComponent]
})
export class StudentListBySchoolSubjectModule {
}
