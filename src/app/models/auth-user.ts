import {MongoEntity} from './mongo-entity';

export interface AuthUser extends MongoEntity {
  account: string;
  password: string;
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}
