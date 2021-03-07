import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SchoolSubject} from '../../models';
import {
  clearMessages,
  MessageStore,
  selectDoneAssignmentsLoadingStatus,
  selectOnGoingAssignmentsLoadingStatus,
  selectUser,
  UserStore
} from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  listSchoolSubject$: Observable<SchoolSubject[] | undefined>;
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<UserStore & MessageStore>) {
    this.store.dispatch(clearMessages());
    this.listSchoolSubject$ = store.pipe(select(selectUser), map(user => user?.subjects));
    this.isLoading$ = combineLatest([
      this.store.pipe(select(selectOnGoingAssignmentsLoadingStatus)),
      this.store.pipe(select(selectDoneAssignmentsLoadingStatus))
    ]).pipe(
      map(isLoadingStatuses => isLoadingStatuses.some((isLoadingStatus) => isLoadingStatus))
    );
  }

  ngOnInit(): void {
  }
}

