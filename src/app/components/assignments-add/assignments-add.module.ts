import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {AssignmentStoreModule} from '../../store/assignment/assignment.module';
import {AssignmentsAddComponent} from './assignments-add.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    AssignmentStoreModule,
    MatStepperModule
  ],
  declarations: [AssignmentsAddComponent],
  exports: [AssignmentsAddComponent]
})
export class AssignmentsAddModule {
}
