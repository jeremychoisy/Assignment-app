import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {StudentListBySchoolSubjectComponent} from './student-list-by-school-subject.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule, MatTableModule, MatProgressSpinnerModule],
  declarations: [StudentListBySchoolSubjectComponent],
  exports: [StudentListBySchoolSubjectComponent]
})
export class StudentListBySchoolSubjectModule {
}
