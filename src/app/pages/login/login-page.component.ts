import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RoutesEnum} from '../../config/enums/index';
import {UserApiService} from '../../services/index';
import {logInUserFromApi, UserStore} from '../../store';
import {clearMessages, MessageStore} from '../../store/message';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public formGroup!: FormGroup;
  public isPasswordHidden = true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userApiService: UserApiService,
    private store: Store<UserStore & MessageStore>) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      account: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getAccountError(): string {
    if (this.formGroup.get('account')?.hasError('required')) {
      return 'An email address is required';
    }
    return this.formGroup.get('account')?.hasError('email') ? 'This email address is invalid'  : '';
  }

  getPasswordError(): string {
    return this.formGroup.get('password')?.hasError('required') ? 'A password is required' : '';
  }

  logAccount(): void {
    this.store.dispatch(clearMessages());
    const account = this.formGroup.get('account')?.value;
    const password = this.formGroup.get('password')?.value;

    if (password && account) {
      this.store.dispatch(logInUserFromApi({
        call: this.userApiService.logIn$(account, password)
      }));
      this.router.navigateByUrl('/' + RoutesEnum.home);
    }
  }
}
