import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {GradeAssignmentComponent} from './grade-assignment.component';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [GradeAssignmentComponent],
  exports: [GradeAssignmentComponent]
})
export class GradeAssignmentModule {
}
