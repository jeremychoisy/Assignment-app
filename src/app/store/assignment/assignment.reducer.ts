import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {AssignmentState} from './assignment.state';

import * as AssignmentActions from './assignment.actions';

export const adapter: EntityAdapter<Assignment> = createEntityAdapter<Assignment>({selectId: model => model._id || ''});

export const initialState: AssignmentState = {
  onGoingAssignments: adapter.getInitialState({isLoading: false}),
  doneAssignments: adapter.getInitialState({isLoading: false}),
  selectedAssignmentId: null
};

export const reducer = createReducer(
  initialState,
  on(AssignmentActions.setAssignments,
    (state, action) =>
    ({
      ...state,
      ...(action.assignmentType === 'onGoing' ?
        {onGoingAssignments: adapter.addMany(action.assignments, {...state.onGoingAssignments, isLoading: false})}
        :
        {doneAssignments: adapter.addMany(action.assignments, {...state.doneAssignments, isLoading: false}), isLoading: false}
        )
    })
  ),
  on(AssignmentActions.loadAssignmentsFromApi,
    (state, action) =>
      ({
        ...state,
        ...(action.assignmentType === 'onGoing' ?
            {onGoingAssignments: {...state.onGoingAssignments, isLoading: true, failure: undefined}}
            :
            {doneAssignments: {...state.doneAssignments, isLoading: true, failure: undefined}}
        )
      })
  ),
  on(AssignmentActions.selectAssignment,
    (state, action) => ({...state, selectedAssignmentId: action.assignmentId})
  ),
  on(AssignmentActions.setAssignmentsFailureStatus,
    (state, action) => ({...state, isLoading: false, failureStatus: action.status})
  )
);
