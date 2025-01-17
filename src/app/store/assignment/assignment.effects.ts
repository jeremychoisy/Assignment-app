import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {pushMessage} from '../message/index';
import {
  createAssignmentFromApi,
  deleteAssignmentFromApi,
  loadAssignmentsFromApi,
  setAssignments,
  setAssignmentsLoadingStatus,
  updateAssignmentFromApi
} from './assignment.actions';

@Injectable()
export class AssignmentEffects {

  constructor(private actions$: Actions) {}

  loadAssignmentsFromApi$ = createEffect(() =>
      this.actions$.pipe(
          ofType(loadAssignmentsFromApi),
          mergeMap(action =>
              action.call.pipe(
                  map((getAssignmentsReply) => setAssignments({getAssignmentsReply, assignmentType: action.assignmentType})),
                  catchError((err) => of(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the assignments (error code :${err.status})`}})))
              )
          )
      )
  );

  createAssignmentFromApi$ = createEffect(() =>
      this.actions$.pipe(
          ofType(createAssignmentFromApi),
          switchMap(action =>
              action.call.pipe(
                  switchMap((createAssignmentReply) => [
                    pushMessage({message: {type: 'success', content: `The assignment '${createAssignmentReply.rootAssignment.name}' has been successfully created.`}}),
                    setAssignmentsLoadingStatus({status: false})
                  ]),
                  catchError((err) => of(
                    pushMessage({message: {type: 'error', content: `Something went wrong while creating the assignment (error code :${err.status})`}}),
                    setAssignmentsLoadingStatus({status: false})
                  ))
              )
          )
      )
  );

  updateAssignmentFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAssignmentFromApi),
      switchMap(action =>
        action.call.pipe(
          switchMap((updateAssignmentReply) => [
            pushMessage({message: {type: 'success', content: `The assignment '${updateAssignmentReply.updatedRootAssignment.name}' has been successfully updated, updating ${updateAssignmentReply.nbOfUpdatedDocuments} assignment(s).`}}),
            setAssignmentsLoadingStatus({status: false})
          ]),
          catchError((err) => of(
            pushMessage({message: {type: 'error', content: `Something went wrong while updating the assignment (error code :${err.status})`}}),
            setAssignmentsLoadingStatus({status: false})
          ))
        )
      )
    )
  );

  deleteAssignmentFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAssignmentFromApi),
      switchMap(action =>
        action.call.pipe(
          switchMap(() => [
            pushMessage({message: {type: 'success', content: `The assignment has been successfully deleted.`}}),
            setAssignmentsLoadingStatus({status: false})
          ]),
          catchError((err) => of(
            pushMessage({message: {type: 'error', content: `Something went wrong while deleting the assignment (error code :${err.status})`}}),
            setAssignmentsLoadingStatus({status: false})
          ))
        )
      )
    )
  );
}
