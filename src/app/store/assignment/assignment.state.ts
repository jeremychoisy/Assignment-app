import {EntityState} from '@ngrx/entity';
import {Assignment} from '../../models/index';

export interface AssignmentState extends EntityState<Assignment> {
  selectedAssignmentId: string | null;
  isLoading: boolean;
  failureStatus?: number;
}

export const ASSIGNMENT_STORE_NAME = 'assignment';

export interface AssignmentStore {
  [ASSIGNMENT_STORE_NAME]: AssignmentState;
}
