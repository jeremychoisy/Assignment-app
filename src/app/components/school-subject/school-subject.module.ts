import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {SchoolSubjectComponent} from './school-subject.component';
import {AssignmentsListModule} from "../assignments-list/assignments-list.module";

@NgModule({
  imports: [CommonModule, MatCardModule, AssignmentsListModule],
    declarations: [SchoolSubjectComponent],
    exports: [
        SchoolSubjectComponent
    ]
})
export class SchoolSubjectModule {
}
