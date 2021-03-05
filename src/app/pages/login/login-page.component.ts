import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {UserApiService} from '../../services';
import {logInUserFromApi, UserStore} from '../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formGroup!: FormGroup;
  hidepassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserApiService,
    private store: Store<UserStore>) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      account: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getAccountError(): string {
    if (this.formGroup.get('account')?.hasError('required')) {
      return 'Une adresse mail est nécessaire';
    }
    return this.formGroup.get('account')?.hasError('email') ? 'L\'adresse e-mail doit être renseignée' : '';
  }

  getPasswordError(): string {
    return this.formGroup.get('password')?.hasError('required') ? 'Un mot de passe est nécessaire' : '';
  }

  logAccount(): void {
    const account = this.formGroup.get('account')?.value;
    const password = this.formGroup.get('password')?.value;

    if (password && account) {
      this.store.dispatch(logInUserFromApi({
        call: this.userApiService.logIn(account, password)
      }));
      this.router.navigateByUrl('/home');
    }
  }
}
