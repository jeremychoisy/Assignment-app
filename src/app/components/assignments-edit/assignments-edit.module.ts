import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AssignmentsEditComponent} from './assignments-edit.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AssignmentsEditComponent],
  exports: [AssignmentsEditComponent]
})
export class AssignmentsEditModule {
}
