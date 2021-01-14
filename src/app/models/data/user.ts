import {MongoEntity} from './mongo-entity';
import {SchoolSubject} from './school-subject';

export type UserLevel = 'student' | 'teacher';

export interface User extends MongoEntity {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  userLevel: UserLevel;
  avatarUrl: string;
  creationDate?: Date;
  subjects: SchoolSubject[];
}
