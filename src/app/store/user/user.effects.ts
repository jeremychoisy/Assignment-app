import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {logInUserFromApi, setUser, setUserFailureStatus} from './user.actions';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions) {
  }

  logInUserFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logInUserFromApi),
      switchMap(action =>
        action.call.pipe(
          map((logInReply) => {
            sessionStorage.setItem('token', logInReply.token);
            return setUser({user: logInReply.user});
          }),
          catchError(err => of(setUserFailureStatus({status: err.status})))
        )
      )
    )
  );
}
