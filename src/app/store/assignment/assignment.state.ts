import {EntityState} from '@ngrx/entity';
import {Assignment} from '../../models/index';

export interface AssignmentEntitiesState extends EntityState<Assignment> {
  isLoading: boolean;
  totalCount: number;
}

export interface AssignmentState {
  onGoingAssignments: AssignmentEntitiesState;
  doneAssignments: AssignmentEntitiesState;
  rootAssignments: AssignmentEntitiesState;
  selectedAssignmentId: string | null;
  isLoading: boolean;
}

export const ASSIGNMENT_STORE_NAME = 'assignment';

export interface AssignmentStore {
  [ASSIGNMENT_STORE_NAME]: AssignmentState;
}
