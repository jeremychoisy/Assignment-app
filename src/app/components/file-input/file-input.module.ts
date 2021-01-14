import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FileInputComponent} from './file-input.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [FileInputComponent],
  exports: [FileInputComponent]
})
export class FileInputModule {
}
