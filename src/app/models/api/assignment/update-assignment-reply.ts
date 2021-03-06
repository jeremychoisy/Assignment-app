import {Assignment} from '../../data';

export interface UpdateAssignmentReply {
    updatedRootAssignment: Assignment;
    nbOfUpdatedDocuments: number;
}
