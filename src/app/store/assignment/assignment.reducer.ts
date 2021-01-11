import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Assignment} from '../../models/index';
import {AssignmentState} from './assignment.state';
import {createReducer, on} from '@ngrx/store';

import * as AssignmentActions from './assignment.actions';

export const adapter: EntityAdapter<Assignment> = createEntityAdapter<Assignment>({selectId: model => model._id || ''});

export const initialState: AssignmentState = adapter.getInitialState({
  selectedAssignmentId: null,
  isLoading: false
});

export const reducer = createReducer(
  initialState,
  on(AssignmentActions.setAssignments,
    (state, action) => adapter.addMany(action.assignments, {...state, isLoading: false})
  ),
  on(AssignmentActions.loadAssignmentsFromApi,
    (state) => ({...state, isLoading: true, failure: undefined})
  ),
  on(AssignmentActions.selectAssignment,
    (state, action) => ({...state, selectedAssignmentId: action.assignmentId})
  ),
  on(AssignmentActions.setAssignmentsFailureStatus,
    (state, action) => ({...state, isLoading: false, failureStatus: action.status})
  )
);
