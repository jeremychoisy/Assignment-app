import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule, DatePipe} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {GradeAssignmentModule} from '../dialogs/grade-assignment/grade-assignment.module';
import {UploadAssignementFileModule} from '../dialogs/upload-assignement-file/upload-assignement-file.module';
import {AssignmentsListComponent} from './assignments-list.component';


@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule, MatTableModule, MatDialogModule, UploadAssignementFileModule, GradeAssignmentModule],
  declarations: [AssignmentsListComponent],
  exports: [AssignmentsListComponent],
  providers: [DatePipe]
})
export class AssignmentsListModule {

}
