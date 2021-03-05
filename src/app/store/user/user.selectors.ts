import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState, USER_STORE_NAME} from './user.state';

export const selectUserState = createFeatureSelector<UserState>(USER_STORE_NAME);

export const selectUser = createSelector(selectUserState, (state) => state.user);
export const selectUserStoreLoadingStatus = createSelector(selectUserState, (state) => state.isLoading);
export const selectUserStoreFailureStatus = createSelector(selectUserState, (state) => state.failureStatus);
