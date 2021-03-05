import {MongoEntity} from './mongo-entity';
import {SchoolSubject} from './school-subject';
import {User} from './user';

export type AssignmentType = 'done' | 'onGoing';

export interface Assignment extends MongoEntity {
  name: string;
  author: User;
  subject: SchoolSubject;
  score: number;
  creationDate?: Date;
  submissionDate?: Date;
  isSubmitted: boolean;
}
