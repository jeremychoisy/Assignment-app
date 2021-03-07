import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, skipWhile, take} from 'rxjs/operators';
import {RoutesEnum} from '../../config/index';
import {UserLevel} from '../../models/index';
import {selectUserState, UserStore} from '../../store/index';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate {

  constructor(private store: Store<UserStore>, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(selectUserState),
      skipWhile(userState => userState.isLoading),
      take(1),
      map(userState =>  userState.user?.userLevel === UserLevel.student ? true : this.router.parseUrl(RoutesEnum.home)),
    );
  }
}
