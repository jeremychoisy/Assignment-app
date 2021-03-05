import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, skipWhile, take} from 'rxjs/operators';
import {selectUserState, UserStore} from '../../store';
import {RoutesEnum} from '../../models/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<UserStore>, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(selectUserState),
      skipWhile(userState => userState.isLoading),
      map(userState =>  !!userState.user ? true : this.router.parseUrl(RoutesEnum.login)),
      take(1)
    );
  }
}
