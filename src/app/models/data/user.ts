import {MongoEntity} from './mongo-entity';
import {SchoolSubject} from './school-subject';

export enum UserLevel {
  student = 'student',
  teacher = 'teacher'
}

export interface User extends MongoEntity {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  userLevel: UserLevel;
  avatarUrl: string;
  creationDate?: Date;
  requestedSubjects: SchoolSubject[];
  subjects: SchoolSubject[];
}
