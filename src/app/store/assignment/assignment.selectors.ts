import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Assignment} from '../../models/index';
import {adapter} from './assignment.reducer';
import {AssignmentState, ASSIGNMENT_STORE_NAME} from './assignment.state';

const {selectEntities, selectAll} = adapter.getSelectors();

const selectAssignmentState = createFeatureSelector<AssignmentState>(ASSIGNMENT_STORE_NAME);
export const selectOnGoingAssignmentState = createSelector(selectAssignmentState, (state) => state.onGoingAssignments);
export const selectDoneAssignmentState = createSelector(selectAssignmentState, (state) => state.doneAssignments);
export const selectRootAssignmentState = createSelector(selectAssignmentState, (state) => state.rootAssignments);

export const selectOnGoingAssignments = createSelector(selectOnGoingAssignmentState, selectAll);
export const selectDoneAssignments = createSelector(selectDoneAssignmentState, selectAll);
export const selectRootAssignments = createSelector(selectRootAssignmentState, selectAll);

export const selectOnGoingAssignmentEntities = createSelector(selectOnGoingAssignmentState, selectEntities);
export const selectDoneAssignmentEntities = createSelector(selectDoneAssignmentState, selectEntities);
export const selectAllAssignmentEntities = createSelector(
  selectOnGoingAssignmentEntities,
  selectDoneAssignmentEntities,
  (onGoingEntities, doneEntities) => ({...onGoingEntities, ...doneEntities}));

export const selectCurrentAssignmentId = createSelector(selectAssignmentState, (state) => state.selectedAssignmentId);
export const selectCurrentAssignment = createSelector(
  selectAllAssignmentEntities,
  selectCurrentAssignmentId,
  (entities, id): Assignment | null => id ? entities[id] || null : null
);

export const selectOnGoingAssignmentsLoadingStatus = createSelector(selectOnGoingAssignmentState, (state) => state.isLoading);
export const selectDoneAssignmentsLoadingStatus = createSelector(selectDoneAssignmentState, (state) => state.isLoading);
export const selectRootAssignmentsLoadingStatus = createSelector(selectRootAssignmentState, (state) => state.isLoading);

export const selectAssignmentsStoreLoadingStatus = createSelector(selectAssignmentState, (state) => state.isLoading);
