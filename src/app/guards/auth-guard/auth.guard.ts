import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, skipWhile, take} from 'rxjs/operators';
import {selectUserState, UserStore} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<UserStore>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectUserState),
      skipWhile(userState => userState.isLoading),
      map(userState => !userState.failureStatus),
      take(1)
    );
  }

}
