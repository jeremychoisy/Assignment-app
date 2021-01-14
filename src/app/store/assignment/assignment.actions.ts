import {createAction, props} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Assignment, AssignmentType} from '../../models/index';

export const loadAssignmentsFromApi = createAction(
  '[Assignment/API] load assignments from API for logged user',
  props<{ call: Observable<Assignment[]>, assignmentType: AssignmentType}>()
);

export const selectAssignment = createAction(
  '[Assignment] select assignment',
  props<{ assignmentId: string }>()
);

export const setAssignments = createAction(
  '[Assignment] set assignments',
  props<{ assignments: Assignment[], assignmentType: AssignmentType }>()
);

export const setAssignmentsFailureStatus = createAction(
  '[Assignment] set assignments store failure status',
  props<{ status: number }>()
);
