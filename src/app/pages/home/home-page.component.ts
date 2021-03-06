import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SchoolSubject} from '../../models';
import {selectUser, UserStore} from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  listSchoolSubject$: Observable<SchoolSubject[] | undefined>;

  constructor(store: Store<UserStore>) {
    this.listSchoolSubject$ = store.pipe(select(selectUser), map(user => user?.subjects));
  }

  ngOnInit(): void {
  }
}

