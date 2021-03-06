import {MongoEntity} from './mongo-entity';
import {User} from './user';

export interface SchoolSubject extends MongoEntity {
  name: string;
  subjectPictureUrl?: string;
  teacher: User;
}
