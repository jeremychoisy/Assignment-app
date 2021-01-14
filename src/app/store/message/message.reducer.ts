import {createReducer, on} from '@ngrx/store';
import {MessageState} from './message.state';

import * as MessageActions from './message.actions';

export const initialState: MessageState = {
  messages: []
};

export const reducer = createReducer(
  initialState,
  on(MessageActions.pushMessage,
    (state, action) => ({...state, messages: [...state.messages, action.message]})
  ),
  on(MessageActions.clearMessages,
    (state) => ({...state, messages: []})
  )
);
