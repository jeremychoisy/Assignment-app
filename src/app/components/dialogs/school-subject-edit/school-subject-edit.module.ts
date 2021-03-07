import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FileInputModule} from '../../file-input/file-input.module';
import {SchoolSubjectEditComponent} from './school-subject-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FileInputModule,
  ],
  declarations: [SchoolSubjectEditComponent],
  exports: [SchoolSubjectEditComponent]
})
export class SchoolSubjectEditModule {
}
