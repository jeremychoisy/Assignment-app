import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {UpdateStudentStatusComponent} from './update-student-status.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [UpdateStudentStatusComponent],
  exports: [UpdateStudentStatusComponent]
})
export class UpdateStudentStatusModule {
}
