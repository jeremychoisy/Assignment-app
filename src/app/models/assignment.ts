import {SchoolSubject} from './school-subject';
import {User} from './user';
import {MongoEntity} from './mongo-entity';

export interface Assignment extends MongoEntity {
  name: string;
  author: User;
  subject: SchoolSubject;
  score: number;
  creationDate?: Date;
  submissionDate?: Date;
  isSubmitted: boolean;
}
