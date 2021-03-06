import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserStoreModule} from '../../store/user/user.module';
import {TeacherAuthGuard} from './teacher-auth.guard';

@NgModule({
  imports: [CommonModule, UserStoreModule],
  providers: [TeacherAuthGuard],
})
export class TeacherAuthGuardModule {
}
