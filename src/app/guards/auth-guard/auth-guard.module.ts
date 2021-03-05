import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {UserStoreModule} from '../../store/user/user.module';
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [CommonModule, UserStoreModule],
  providers: [AuthGuard],
})
export class AuthGuardModule {
}
