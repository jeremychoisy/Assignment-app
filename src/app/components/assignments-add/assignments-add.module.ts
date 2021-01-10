import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AssignmentsAddComponent} from './assignments-add.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AssignmentsAddComponent],
  exports: [AssignmentsAddComponent]
})
export class AssignmentsAddModule {
}
