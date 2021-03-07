import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserStoreModule} from '../../store/user/user.module';
import {StudentAuthGuard} from './student-auth.guard';

@NgModule({
  imports: [CommonModule, UserStoreModule],
  providers: [StudentAuthGuard],
})
export class StudentAuthGuardModule {
}
