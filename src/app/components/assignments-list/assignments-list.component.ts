import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DatePipe} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {Assignment, UserLevel} from '../../models';
import {AssignmentApiService} from '../../services';
import {
  AssignmentStore,
  loadAssignmentsFromApi,
  resetAssignments,
  selectDoneAssignments,
  selectOnGoingAssignments,
  selectUser,
  UserStore
} from '../../store';

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

  constructor(private assignmentApiService: AssignmentApiService, private store: Store<AssignmentStore & UserStore>, private datePipe: DatePipe) {
    this.userLevel$ = this.store.pipe(select(selectUser), map(user => user?.userLevel));
    this.displayedColumns$ = this.userLevel$.pipe(
      filter(userLevel => !!userLevel),
      map(userLevel => {
        if (userLevel === 'student') {
          return this.doneStatus ? ['Name', 'Score', 'Work'] : ['Name', 'Submission Date', 'Work'];
        } else {
          return this.doneStatus ? ['Name', 'Score', 'Submission Date', 'Work'] : ['Name', 'Creation Date', 'Work'];
        }
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(resetAssignments());
    this.loadAssignments();
  }

  private loadAssignments(shouldUpdateLoadingStatus: boolean = true): void {
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
    console.log('In Scroll event');
    const tableViewHeight = $event.target.offsetHeight;
    const tableScrollHeight = $event.target.scrollHeight;
    const scrollLocation = $event.target.scrollTop;

    const limit = tableScrollHeight - tableViewHeight - 200;
    if (scrollLocation > limit) {
      this.loadAssignments();
      this.pageNumber++;
    }
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
      case 'Creation Date':
        console.log('in creation date');
        date = this.datePipe.transform(item.creationDate, 'dd-MM-yyyy');
        return date?.toString() || 'No date';
      default:
        return '';
    }
  }

  public drop(event: CdkDragDrop<Assignment[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
