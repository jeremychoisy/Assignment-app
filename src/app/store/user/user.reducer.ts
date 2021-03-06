import {createReducer, on} from '@ngrx/store';
import {UserState} from './user.state';

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
    (state) => ({...state, isLoading: true})
  ),
  on(UserActions.getUserFromApi,
    (state) => ({...state, isLoading: true})
  ),
  on(UserActions.logOutUser,
    (state) => {
      sessionStorage.removeItem('token');
      return {...state, user: null};
    }
  )
);
