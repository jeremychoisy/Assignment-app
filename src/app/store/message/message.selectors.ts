import {createFeatureSelector, createSelector} from '@ngrx/store';
import {MESSAGE_STORE_NAME, MessageState} from './message.state';

const selectMessageState = createFeatureSelector<MessageState>(MESSAGE_STORE_NAME);

export const selectMessages = createSelector(selectMessageState, (state) => state.messages);
export const selectErrorMessages = createSelector(selectMessageState, (state) =>
  state.messages.filter((message) => message.type === 'error'));
export const selectSuccessMessages = createSelector(selectMessageState, (state) => state.messages.filter((message) => message.type === 'success'));
