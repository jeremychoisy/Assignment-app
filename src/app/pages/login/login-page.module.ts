import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import {UserStoreModule} from '../../store/user/user.module';
import {LoginPageComponent} from './login-page.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    UserStoreModule, MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule, MatButtonModule],
  declarations: [LoginPageComponent],
})
export class LoginPageModule {
}
