import {UserState} from './user.state';
import {createReducer, on} from '@ngrx/store';

import * as UserActions from './user.actions';


export const initialState: UserState = {
  user: null,
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(UserActions.setUser,
    (state, action) => ({...state, user: action.user, isLoading: false})
  ),
  on(UserActions.logInUserFromApi,
    (state) => ({...state, isLoading: true, failure: undefined})
  ),
  on(UserActions.setUserFailureStatus,
    (state, action) => ({...state, isLoading: false, failureStatus: action.status})
  )
);
