import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {pushMessage} from '../message/index';
import {loadAssignmentsFromApi, setAssignments, setAssignmentsFailureStatus} from './assignment.actions';

@Injectable()
export class AssignmentEffects {

  constructor(private actions$: Actions) {
  }

  loadAssignmentsFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignmentsFromApi),
      switchMap(action =>
        action.call.pipe(
          map((assignments) => setAssignments({assignments, assignmentType: action.assignmentType})),
          catchError((err) => of(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the assignments (error code :${err.status})`}})))
        )
      )
    )
  );
}
