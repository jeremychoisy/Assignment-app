import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {pushMessage} from '../message/index';
import {getUserFromApi, logInUserFromApi, setUser, setUserFailureStatus} from './user.actions';

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
          catchError(err => of(pushMessage({message: {type: 'error', content: `Something went wrong while trying to login (error code :${err.status})`}})))
        )
      )
    )
  );

  getUserFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserFromApi),
      switchMap(action =>
        action.call.pipe(
          map((getUserReply) => setUser({user: getUserReply.user})),
          catchError(err => of(pushMessage({message: {type: 'error', content: `Something went wrong while trying to get the user (error code :${err.status})`}})))
        )
      )
    )
  );
}
