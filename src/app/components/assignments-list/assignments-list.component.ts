import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Assignment} from '../../models/index';
import {AssignmentApiService} from '../../services/index';
import {AssignmentStore, loadAssignmentsFromApi, selectDoneAssignments, selectOnGoingAssignments} from '../../store/index';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {
  public doneAssignments: Assignment[] = [];
  public onGoingAssignments: Assignment[] = [];

  constructor(private store: Store<AssignmentStore>, private assignmentApiService: AssignmentApiService) {
    this.loadAssignments();
    this.store.pipe(select(selectDoneAssignments)).subscribe((assignments) => {
      console.log('init');
      this.doneAssignments = [...assignments, ...assignments, ...assignments, ...assignments];
      this.onGoingAssignments = [...assignments, ...assignments, ...assignments, ...assignments];
    });
  }

  private loadAssignments(): void {
    this.store.dispatch(loadAssignmentsFromApi({
      call: this.assignmentApiService.getAssignments$(),
      assignmentType: 'done'
    }));
    // this.store.dispatch(loadAssignmentsFromApi({
    //   call: this.assignmentApiService.getAssignments$(),
    //   assignmentType: 'onGoing'
    // }));
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

  ngOnInit(): void {
  }

}
