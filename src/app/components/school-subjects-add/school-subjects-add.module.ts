import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MessageStoreModule} from '../../store/message/message.module';
import {FileInputModule} from '../file-input/file-input.module';
import {SchoolSubjectsAddComponent} from './school-subjects-add.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileInputModule,
    MessageStoreModule
  ],
  declarations: [SchoolSubjectsAddComponent],
  exports: [SchoolSubjectsAddComponent]
})
export class SchoolSubjectsAddModule {
}
