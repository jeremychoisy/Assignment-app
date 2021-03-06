import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, skipWhile, take} from 'rxjs/operators';
import {Assignment} from '../../models/index';
import {AssignmentApiService} from '../../services/index';
import {
  AssignmentStore,
  loadAssignmentsFromApi,
  resetAssignments,
  selectAssignmentsStoreLoadingStatus,
  selectRootAssignments,
  selectRootAssignmentsLoadingStatus
} from '../../store/index';
import {AssignmentsEditComponent} from '../assignments-edit/assignments-edit.component';

@Component({
  selector: 'app-root-assignments-list',
  templateUrl: './root-assignments-list.component.html',
  styleUrls: ['./root-assignments-list.component.scss']
})
export class RootAssignmentsListComponent implements OnInit {
  @Input()
  public subjectId = '';

  public rootAssignments$: Observable<Assignment[]>;

  public isLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['name', 'creationDate', 'submissionDate'];

  constructor(private store: Store<AssignmentStore>, private assignmentApiService: AssignmentApiService, public dialog: MatDialog) {
    this.store.dispatch(resetAssignments());
    this.rootAssignments$ = this.store.pipe(select(selectRootAssignments));
    this.isLoading$ = combineLatest([
      this.store.pipe(select(selectRootAssignmentsLoadingStatus)),
      this.store.pipe(select(selectAssignmentsStoreLoadingStatus))
    ]).pipe(
      map(isLoadingStatuses => isLoadingStatuses.some((isLoadingStatus) => isLoadingStatus))
    );
  }

  private loadAssignments(): void {
    this.store.dispatch(resetAssignments());
    this.store.dispatch(loadAssignmentsFromApi({
      call: this.assignmentApiService.getRootAssignments$(this.subjectId),
      assignmentType: 'root'
    }));
  }

  public ngOnInit(): void {
    this.loadAssignments();
  }

  public openDialog(assignment: Assignment): void {
    const dialogRef = this.dialog.open(AssignmentsEditComponent, {
      data: {
        assignment
      },
      width: '40rem'
    });
    dialogRef.afterClosed().subscribe((hasBeenUpdated) => {
      if (hasBeenUpdated) {
        this.store.pipe(
          select(selectAssignmentsStoreLoadingStatus),
          skipWhile((isLoading) => isLoading),
          take(1)
        ).subscribe(() => this.loadAssignments());
      }
    });
  }
}
