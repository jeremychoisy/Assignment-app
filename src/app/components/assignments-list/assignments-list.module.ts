import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {AssignmentsListComponent} from './assignments-list.component';

@NgModule({
  imports: [CommonModule, AssignmentStoreModule, DragDropModule, MatCardModule],
  declarations: [AssignmentsListComponent],
  exports: [AssignmentsListComponent]
})
export class AssignmentsListModule {
}
