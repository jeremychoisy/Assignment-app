import {DatePipe} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';
import {Assignment, UserLevel} from '../../models';
import {AssignmentApiService} from '../../services';
import {
  AssignmentStore,
  clearMessages,
  loadAssignmentsFromApi,
  pushMessage,
  resetAssignments,
  selectDoneAssignments,
  selectOnGoingAssignments,
  selectUser,
  UserStore
} from '../../store';
import {GradeAssignmentComponent} from '../dialogs/grade-assignment/grade-assignment.component';
import {UploadAssignementFileComponent} from '../dialogs/upload-assignement-file/upload-assignement-file.component';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {
  @Input()
  public doneStatus = false;
  @Input()
  public currentSchoolSubjectId = '';

  public assignmentsList$: Observable<Assignment[]> | undefined;
  public displayedColumns$: Observable<string[]>;
  public userLevel$: Observable<UserLevel | undefined>;
  public pageNumber = 1;

  constructor(private assignmentApiService: AssignmentApiService, private store: Store<AssignmentStore & UserStore>, private datePipe: DatePipe, private dialog: MatDialog) {
    this.userLevel$ = this.store.pipe(select(selectUser), map(user => user?.userLevel));
    this.displayedColumns$ = this.userLevel$.pipe(
      filter(userLevel => !!userLevel),
      map(userLevel => {
        if (userLevel === 'student') {
          return this.doneStatus ? ['Name', 'Score', 'Work'] : ['Name', 'Submission Date', 'Work', 'Submit'];
        } else {
          return this.doneStatus ? ['Name', 'Author', 'Score', 'Work'] : ['Name', 'Author', 'Submission Date', 'Work', 'Submit'];
        }
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(resetAssignments());
    this.loadAssignments();
  }

  private loadAssignments(shouldUpdateLoadingStatus: boolean = true): void {
    this.store.dispatch(clearMessages());
    this.store.dispatch(loadAssignmentsFromApi({
      call: this.assignmentApiService.getAssignments$(this.currentSchoolSubjectId, this.doneStatus, this.pageNumber),
      assignmentType: this.doneStatus ? 'done' : 'onGoing',
      shouldUpdateLoadingStatus
    }));
    this.assignmentsList$ = this.store.pipe(
      select(this.doneStatus ? selectDoneAssignments : selectOnGoingAssignments),
      map((assignments: Assignment[]) =>
        assignments.filter(assignment => assignment.subject._id === this.currentSchoolSubjectId)
      ));
  }

  onTableScroll({$event}: { $event: any }): void {
    const tableViewHeight = $event.target.offsetHeight;
    const tableScrollHeight = $event.target.scrollHeight;
    const scrollLocation = $event.target.scrollTop;

    const limit = tableScrollHeight - tableViewHeight - 200;
    if (scrollLocation > limit) {
      this.loadAssignments();
      this.pageNumber++;
    }
  }

  getGenericDisplayedColumns(displayedColumns: string []): string[] {
    return displayedColumns.filter(value => value !== 'Work' && value !== 'Submit');
  }

  getCellValue(item: Assignment, element: string): string {

    let date;
    switch (element) {
      case 'Name':
        return item.name || 'Unknown';
      case 'Score':
        return item.score?.toString() || 'No scored';
      case 'Submission Date':
        date = this.datePipe.transform(item.submissionDate, 'dd-MM-yyyy');
        return date?.toString() || 'No date';
      case 'Author':
        return item.author.name + item.author.lastName;
      case 'Creation Date':
        date = this.datePipe.transform(item.creationDate, 'dd-MM-yyyy');
        return date?.toString() || 'No date';
      default:
        return '';
    }
  }

  public openUploadDialog(assignment: Assignment): void {
    this.store.dispatch(clearMessages());
    const dialogRef = this.dialog.open(UploadAssignementFileComponent, {
      width: '40rem'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === false) {
        this.store.dispatch(pushMessage({
          message: {
            type: 'error',
            content: `Something went wrong while uploading the file`
          }
        }));
      } else if (res && assignment._id) {
        this.assignmentApiService.updateAssignment$(assignment._id, res, false).pipe(
          take(1),
          catchError((err) => of(err.status))
        ).subscribe((updateRes) => {
          if (typeof updateRes === 'string') {
            this.store.dispatch(pushMessage({
              message: {
                type: 'error',
                content: `Something went wrong while uploading the file`
              }
            }));
          } else {
            this.store.dispatch(pushMessage({
              message: {
                type: 'success',
                content: `The file has been uploaded`
              }
            }));
            this.pageNumber = 1;
            this.store.dispatch(resetAssignments());
            this.loadAssignments();
          }
        });
      }
    });
  }

  openSubmit(assignment: Assignment, userLevel: string): void {
    this.store.dispatch(clearMessages());

    if (userLevel === 'student') {
      if (assignment._id && assignment.assignmentUrl) {
        this.assignmentApiService.updateAssignment$(assignment._id, assignment.assignmentUrl, true).pipe(
          take(1),
          catchError((err) => of(err.status))
        ).subscribe((updateRes) => {
          if (typeof updateRes === 'string') {
            this.store.dispatch(pushMessage({
              message: {
                type: 'error',
                content: `Something went wrong while submitting assignment`
              }
            }));
          } else {
            this.store.dispatch(pushMessage({
              message: {
                type: 'success',
                content: `The assignment has been submited`
              }
            }));
            this.pageNumber = 1;
            this.store.dispatch(resetAssignments());
            this.loadAssignments();
          }
        });
      } else {
        this.store.dispatch(pushMessage({
          message: {
            type: 'error',
            content: `Please make sure to have uploaded your work`
          }
        }));
      }
    } else {
      const dialogRef = this.dialog.open(GradeAssignmentComponent, {
        width: '40rem'
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res && assignment._id) {
          this.assignmentApiService.gradeAssignment$(assignment._id, res).pipe(
            take(1),
            catchError((err) => of(err.status))
          ).subscribe((updateRes) => {
            if (typeof updateRes === 'string') {
              this.store.dispatch(pushMessage({
                message: {
                  type: 'error',
                  content: `Something went wrong while gradding assignment`
                }
              }));
            } else {
              this.store.dispatch(pushMessage({
                message: {
                  type: 'success',
                  content: `The assignment has been submitted`
                }
              }));
              this.pageNumber = 1;
              this.store.dispatch(resetAssignments());
              this.loadAssignments();
            }
          });
        }
      });
    }
  }
}
