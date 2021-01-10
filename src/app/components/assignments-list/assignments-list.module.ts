import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AssignmentsListComponent} from './assignments-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AssignmentsListComponent],
  exports: [AssignmentsListComponent]
})
export class AssignmentsListModule {
}
