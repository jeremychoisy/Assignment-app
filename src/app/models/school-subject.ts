import {User} from './user';
import {MongoEntity} from './mongo-entity';

export interface SchoolSubject extends MongoEntity {
  name: string;
  subjectPictureUrl: string;
  teacher: User;
  desc: string|undefined;
}
