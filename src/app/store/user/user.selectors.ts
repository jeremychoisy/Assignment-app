import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USER_STORE_NAME, UserState} from './user.state';

const selectUserState = createFeatureSelector<UserState>(USER_STORE_NAME);

export const selectUser = createSelector(selectUserState, (state) => state.user);
export const selectUserStoreLoadingStatus = createSelector(selectUserState, (state) => state.isLoading);
export const selectUserStoreFailureStatus = createSelector(selectUserState, (state) => state.failureStatus);
