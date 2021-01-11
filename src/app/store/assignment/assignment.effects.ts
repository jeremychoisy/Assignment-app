import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {loadAssignmentsFromApi, setAssignments, setAssignmentsFailureStatus} from './assignment.actions';
import {of} from 'rxjs';

@Injectable()
export class AssignmentEffects {

  constructor(private actions$: Actions) {
  }

  loadAssignmentsFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAssignmentsFromApi),
      switchMap(action =>
        action.call.pipe(
          map((assignments) => setAssignments({assignments})),
          catchError((err) => of(setAssignmentsFailureStatus({status: err.status})))
        )
      )
    )
  );
}
