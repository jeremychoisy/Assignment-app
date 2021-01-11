import {SchoolSubject} from './school-subject';
import {MongoEntity} from './mongo-entity';

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
