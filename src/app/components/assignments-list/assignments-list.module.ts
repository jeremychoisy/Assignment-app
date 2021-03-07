import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule, DatePipe} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {FileInputModule} from '../file-input/file-input.module';
import {AssignmentsListComponent} from './assignments-list.component';


@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule, MatTableModule, FileInputModule],
  declarations: [AssignmentsListComponent],
  exports: [AssignmentsListComponent],
  providers: [DatePipe]
})
export class AssignmentsListModule {

}
