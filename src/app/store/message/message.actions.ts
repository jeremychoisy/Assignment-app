import {createAction, props} from '@ngrx/store';
import {Message} from '../../models/index';

export const pushMessage = createAction(
  '[Message] push a message',
  props<{ message: Message }>()
);

export const clearMessages = createAction(
  '[Message] clear all the stored messages'
);
