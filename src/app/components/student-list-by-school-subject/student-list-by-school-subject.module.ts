import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {StudentListBySchoolSubjectComponent} from './student-list-by-school-subject.component';

@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule],
  declarations: [StudentListBySchoolSubjectComponent],
  exports: [StudentListBySchoolSubjectComponent]
})
export class StudentListBySchoolSubjectModule {
}
