import {Assignment} from '../../data';

export interface CreateAssignmentReply {
    rootAssignment: Assignment;
    nbOfAssignmentsCreated: number;
}
