import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ApplySubjectComponent} from './apply-subject.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [ApplySubjectComponent],
  exports: [ApplySubjectComponent]
})
export class ApplySubjectModule {
}
