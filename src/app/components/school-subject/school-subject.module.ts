import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SchoolSubjectComponent} from './school-subject.component';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [SchoolSubjectComponent],
})
export class SchoolSubjectModule {
}
