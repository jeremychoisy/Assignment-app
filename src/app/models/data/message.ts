export type messageType = 'error' | 'success';

export interface Message {
  type: messageType;
  content: string;
}
