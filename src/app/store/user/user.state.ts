import {User} from '../../models/index';

export interface UserState {
  user: User | null;
  isLoading: boolean;
  failureStatus?: number;
}

export const USER_STORE_NAME = 'user';

export interface UserStore {
  [USER_STORE_NAME]: UserState;
}
