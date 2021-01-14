import {createAction, props} from '@ngrx/store';
import {Observable} from 'rxjs';
import {LogInReply, User} from '../../models/index';

export const logInUserFromApi = createAction(
  '[User/API] log in the user from the API',
  props<{ call: Observable<LogInReply> }>()
);

export const setUser = createAction(
  '[User] set user',
  props<{ user: User }>()
);

export const setUserFailureStatus = createAction(
  '[User] set user store failure status',
  props<{ status: number }>()
);
