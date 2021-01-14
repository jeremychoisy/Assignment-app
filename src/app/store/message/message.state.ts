import {Message} from '../../models/index';

export interface MessageState {
  messages: Message[];
}

export const MESSAGE_STORE_NAME = 'message';

export interface MessageStore {
  [MESSAGE_STORE_NAME]: MessageState;
}
