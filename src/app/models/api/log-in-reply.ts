import {User} from '../data/index';

export interface LogInReply {
  user: User;
  token: string;
}
