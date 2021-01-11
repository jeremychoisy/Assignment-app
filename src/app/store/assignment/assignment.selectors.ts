import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ASSIGNMENT_STORE_NAME, AssignmentState} from './assignment.state';
import {adapter} from './assignment.reducer';
import {Assignment} from '../../models/index';

const {selectIds, selectEntities, selectAll, selectTotal} = adapter.getSelectors();

const selectAssignmentState = createFeatureSelector<AssignmentState>(ASSIGNMENT_STORE_NAME);

export const selectAssignments = createSelector(selectAssignmentState, selectAll);
export const selectAssignmentsEntities = createSelector(selectAssignmentState, selectEntities);
export const selectCurrentAssignmentId = createSelector(selectAssignmentState, (state) => state.selectedAssignmentId);
export const selectCurrentAssignment = createSelector(
  selectAssignmentsEntities,
  selectCurrentAssignmentId,
  (entities, id): Assignment | null => id ? entities[id] || null : null
);
export const selectAssignmentStoreLoadingStatus = createSelector(selectAssignmentState, (state) => state.isLoading);
export const selectAssignmentStoreFailureStatus = createSelector(selectAssignmentState, (state) => state.failureStatus);
