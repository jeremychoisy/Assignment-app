import {createAction, props} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AssignmentType, CreateAssignmentReply, GetAssignmentsReply} from '../../models/index';

export const loadAssignmentsFromApi = createAction(
  '[Assignment/API] load assignments from API for logged user',
  props<{ call: Observable<GetAssignmentsReply>, assignmentType: AssignmentType}>()
);

export const createAssignmentFromApi = createAction(
    '[Assignment/API] create assignment from API',
    props<{call: Observable<CreateAssignmentReply>}>()
);

export const selectAssignment = createAction(
  '[Assignment] select assignment',
  props<{ assignmentId: string }>()
);

export const setAssignments = createAction(
  '[Assignment] set assignments',
  props<{ getAssignmentsReply: GetAssignmentsReply, assignmentType: AssignmentType }>()
);

export const resetAssignments = createAction(
  '[Assignment] reset assignments store'
);

export const setAssignmentsLoadingStatus = createAction(
  '[Assignment] set assignments store loading status',
  props<{ status: boolean }>()
);
