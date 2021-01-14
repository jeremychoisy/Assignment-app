import {EntityState} from '@ngrx/entity';
import {Assignment} from '../../models/index';

export interface AssignmentEntitiesState extends EntityState<Assignment> {
  isLoading: boolean;
  failureStatus?: number;
}

export interface AssignmentState {
  onGoingAssignments: AssignmentEntitiesState;
  doneAssignments: AssignmentEntitiesState;
  selectedAssignmentId: string | null;
}

export const ASSIGNMENT_STORE_NAME = 'assignment';

export interface AssignmentStore {
  [ASSIGNMENT_STORE_NAME]: AssignmentState;
}
