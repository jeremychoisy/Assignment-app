import {Assignment} from '../../data';

export interface GetAssignmentsReply {
    assignments: Assignment[];
    totalCount: number;
}
