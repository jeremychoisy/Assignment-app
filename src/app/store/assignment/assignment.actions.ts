import {createAction, props} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {Observable} from 'rxjs';

export const loadAssignmentsFromApi = createAction(
  '[Assignment/API] load assignments from API for logged user',
  props<{ call: Observable<Assignment[]> }>()
);

export const selectAssignment = createAction(
  '[Assignment] select assignment',
  props<{ assignmentId: string }>()
);

export const setAssignments = createAction(
  '[Assignment] set assignments',
  props<{ assignments: Assignment[] }>()
);

export const setAssignmentsFailureStatus = createAction(
  '[Assignment] set assignments store failure status',
  props<{ status: number }>()
);
