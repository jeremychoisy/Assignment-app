import {User} from '../../data';

export interface LogInReply {
  user: User;
  token: string;
}
