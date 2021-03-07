import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {combineLatest, fromEvent, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, skipWhile, take, withLatestFrom} from 'rxjs/operators';
import {Assignment} from '../../models/index';
import {AssignmentApiService} from '../../services/index';
import {
  AssignmentStore,
  loadAssignmentsFromApi,
  resetAssignments,
  selectAssignmentsStoreLoadingStatus,
  selectRootAssignments,
  selectRootAssignmentsLoadingStatus, selectRootAssignmentState
} from '../../store/index';
import {AssignmentsEditComponent} from '../dialogs/assignments-edit/assignments-edit.component';

@Component({
  selector: 'app-root-assignments-list',
  templateUrl: './root-assignments-list.component.html',
  styleUrls: ['./root-assignments-list.component.scss']
})
export class RootAssignmentsListComponent implements OnInit, AfterViewInit {
  @Input()
  public subjectId = '';

  public rootAssignments$: Observable<Assignment[]>;

  public isLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['name', 'creationDate', 'submissionDate'];

  private page = 1;
  private limit = 20;
  private totalCount$: Observable<number>;

  @ViewChild('tableContainer', {static: false})
  private tableContainer?: ElementRef;

  constructor(private store: Store<AssignmentStore>, private assignmentApiService: AssignmentApiService, public dialog: MatDialog) {
    this.store.dispatch(resetAssignments());
    this.rootAssignments$ = this.store.pipe(select(selectRootAssignments));
    this.isLoading$ = combineLatest([
      this.store.pipe(select(selectRootAssignmentsLoadingStatus)),
      this.store.pipe(select(selectAssignmentsStoreLoadingStatus))
    ]).pipe(
      map(isLoadingStatuses => isLoadingStatuses.some((isLoadingStatus) => isLoadingStatus))
    );
    this.totalCount$ = this.store.pipe(
      select(selectRootAssignmentState),
      map(rootAssignmentState => rootAssignmentState.totalCount)
    );
  }

  private loadAssignments(shouldUpdateLoadingStatus: boolean = true): void {
    this.store.dispatch(loadAssignmentsFromApi({
      call: this.assignmentApiService.getRootAssignments$(this.subjectId, this.page, this.limit),
      assignmentType: 'root',
      shouldUpdateLoadingStatus
    }));
  }

  public ngOnInit(): void {
    this.loadAssignments();
  }

  public ngAfterViewInit(): void {
    this.setScrollObservable();
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
        ).subscribe(() => {
          this.store.dispatch(resetAssignments());
          this.loadAssignments();
        });
      }
    });
  }

  public setScrollObservable(): void {
    if (this.tableContainer?.nativeElement) {
      fromEvent(this.tableContainer.nativeElement, 'scroll').pipe(
        withLatestFrom(this.totalCount$, this.rootAssignments$),
        debounceTime(50),
        distinctUntilChanged()
      ).subscribe(([e, totalCount, rootAssignments]: [any, number, Assignment[]]) => {
        const tableViewHeight = e.target.offsetHeight;
        const tableScrollHeight = e.target.scrollHeight;
        const scrollLocation = e.target.scrollTop;

        // If the user has scrolled within 50px of the bottom, add more data
        const buffer = 50;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        console.log(rootAssignments.length);
        console.log(totalCount);
        if (scrollLocation > limit && (rootAssignments.length < totalCount)) {
          this.page ++;
          this.loadAssignments(false);
        }
      });
    }
  }
}
