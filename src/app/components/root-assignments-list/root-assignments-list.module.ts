import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {AssignmentsEditModule} from '../assignments-edit/assignments-edit.module';
import {RootAssignmentsListComponent} from './root-assignments-list.component';

@NgModule({
  imports: [
    CommonModule,
    AssignmentStoreModule,
    DragDropModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AssignmentsEditModule
  ],
  declarations: [RootAssignmentsListComponent],
  exports: [RootAssignmentsListComponent]
})
export class RootAssignmentsListModule {
}
