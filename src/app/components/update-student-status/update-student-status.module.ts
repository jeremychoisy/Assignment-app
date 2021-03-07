import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UpdateStudentStatusComponent} from './update-student-status.component';
import {MatButtonModule} from '@angular/material/button';

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
