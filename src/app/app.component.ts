import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RoutesEnum} from './config/index';
import {UserLevel} from './models/index';
import {logOutUser, selectUser, UserStore} from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isUserLogged$: Observable<boolean>;
  public isTeacherLogged$: Observable<boolean>;

  constructor(private store: Store<UserStore>, private router: Router) {
    this.isUserLogged$ = this.store.pipe(
      select(selectUser),
      map(user => !!user)
    );
    this.isTeacherLogged$ = this.store.pipe(
      select(selectUser),
      map(user => user?.userLevel === UserLevel.teacher)
    );
  }

  /**
   * Clean the user store, remove the token in the session storage and
   * navigate to the login page.
   */
  public logOut(): void {
    this.store.dispatch(logOutUser());
    this.router.navigateByUrl(RoutesEnum.login);
  }

  public navigateToHomePage(): void {
    this.router.navigateByUrl(RoutesEnum.home);
  }

  public navigateToTeacherPage(): void {
    this.router.navigateByUrl(RoutesEnum.teacher);
  }

  public navigateToSubjectsPage(): void {
    this.router.navigateByUrl(RoutesEnum.subjects);
  }
}
