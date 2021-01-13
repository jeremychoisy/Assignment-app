import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  hidepassword = true;

  constructor(private formBuilder: FormBuilder) {
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

  logAccount(value: any): void {
    console.log(value);
    // TODO envoyer la connexion au serveur attendre la réponse et redirigée
  }

}
