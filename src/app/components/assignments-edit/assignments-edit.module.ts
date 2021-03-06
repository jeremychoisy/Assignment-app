import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {AssignmentsEditComponent} from './assignments-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    AssignmentStoreModule,
    MatButtonModule,
    MatInputModule,
  ],
  declarations: [AssignmentsEditComponent],
  exports: [AssignmentsEditComponent]
})
export class AssignmentsEditModule {
}
