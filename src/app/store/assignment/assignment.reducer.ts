import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {AssignmentState} from './assignment.state';

import * as AssignmentActions from './assignment.actions';

export const adapter: EntityAdapter<Assignment> = createEntityAdapter<Assignment>({selectId: model => model._id || ''});

export const initialState: AssignmentState = {
  onGoingAssignments: adapter.getInitialState({isLoading: false, totalCount: 0}),
  doneAssignments: adapter.getInitialState({isLoading: false, totalCount: 0}),
  rootAssignments: adapter.getInitialState({isLoading: false, totalCount: 0}),
  selectedAssignmentId: null,
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(AssignmentActions.setAssignments,
    (state, action) => {
      let update = {};
      switch (action.assignmentType) {
        case 'done':
          update = {
            doneAssignments: adapter.addMany(action.getAssignmentsReply.assignments, {
              ...state.doneAssignments,
              isLoading: false,
              totalCount: action.getAssignmentsReply.totalCount
            })
          };
          break;
        case 'onGoing':
          update = {
            onGoingAssignments: adapter.addMany(action.getAssignmentsReply.assignments, {
              ...state.onGoingAssignments,
              isLoading: false,
              totalCount: action.getAssignmentsReply.totalCount
            })
          };
          break;
        case 'root':
          update = {
            rootAssignments: adapter.addMany(action.getAssignmentsReply.assignments, {
              ...state.rootAssignments,
              isLoading: false,
              totalCount: action.getAssignmentsReply.totalCount
            })
          };
      }
      return ({
        ...state,
        ...update
      });
    }
  ),
  on(AssignmentActions.loadAssignmentsFromApi,
    (state, action) =>
      ({
        ...state,
        ...(action.assignmentType === 'onGoing' ?
            {onGoingAssignments: {...state.onGoingAssignments, isLoading: action.shouldUpdateLoadingStatus}}
            : action.assignmentType === 'done' ?
            {doneAssignments: {...state.doneAssignments, isLoading: action.shouldUpdateLoadingStatus}}
            :
            {rootAssignments: {...state.rootAssignments, isLoading: action.shouldUpdateLoadingStatus}}
        )
      })
  ),
  on(AssignmentActions.createAssignmentFromApi,
      (state) => ({...state, isLoading: true})
  ),
  on(AssignmentActions.deleteAssignmentFromApi,
    (state) => ({...state, isLoading: true})
  ),
  on(AssignmentActions.updateAssignmentFromApi,
    (state) => ({...state, isLoading: true})
  ),
  on(AssignmentActions.selectAssignment,
    (state, action) => ({...state, selectedAssignmentId: action.assignmentId})
  ),
  on(AssignmentActions.setAssignmentsLoadingStatus,
    (state, action) => ({...state, isLoading: action.status})
  )
  ,
  on(AssignmentActions.resetAssignments,
    () => ({...initialState})
  )
);
