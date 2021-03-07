import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FileInputModule} from '../../file-input/file-input.module';
import {UploadAssignementFileComponent} from './upload-assignement-file.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FileInputModule,
  ],
  declarations: [UploadAssignementFileComponent],
  exports: [UploadAssignementFileComponent]
})
export class UploadAssignementFileModule {
}
