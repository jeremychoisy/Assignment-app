import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {AssignmentState} from './assignment.state';

import * as AssignmentActions from './assignment.actions';

export const adapter: EntityAdapter<Assignment> = createEntityAdapter<Assignment>({selectId: model => model._id || ''});

export const initialState: AssignmentState = {
  onGoingAssignments: adapter.getInitialState({isLoading: false, totalCount: 0}),
  doneAssignments: adapter.getInitialState({isLoading: false, totalCount: 0}),
  selectedAssignmentId: null,
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(AssignmentActions.setAssignments,
    (state, action) =>
    ({
      ...state,
      ...(action.assignmentType === 'onGoing' ?
        {onGoingAssignments: adapter.addMany(action.getAssignmentsReply.assignments, {...state.onGoingAssignments, isLoading: false, totalCount: action.getAssignmentsReply.totalCount})}
        :
        {doneAssignments: adapter.addMany(action.getAssignmentsReply.assignments, {...state.doneAssignments, isLoading: false}), isLoading: false, totalCount: action.getAssignmentsReply.totalCount}
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
  on(AssignmentActions.createAssignmentFromApi,
      (state) => ({...state, isLoading: true})
  ),
  on(AssignmentActions.selectAssignment,
    (state, action) => ({...state, selectedAssignmentId: action.assignmentId})
  ),
  on(AssignmentActions.setAssignmentsLoadingStatus,
    (state, action) => ({...state, isLoading: action.status})
  )
);
