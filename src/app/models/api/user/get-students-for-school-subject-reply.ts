import {User} from '../../data/index';


export interface GetStudentsForSchoolSubjectReply {
  users: User[];
  totalCount: number;
}
