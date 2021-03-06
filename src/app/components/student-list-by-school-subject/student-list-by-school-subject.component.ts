import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {User} from '../../models';
import {UserApiService} from '../../services/index';
import {MessageStore, pushMessage} from '../../store/index';
import {catchError, take} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-student-list-by-school-subject',
  templateUrl: './student-list-by-school-subject.component.html',
  styleUrls: ['./student-list-by-school-subject.scss']
})
export class StudentListBySchoolSubjectComponent implements OnInit {
  @Input()
  public subjectId = '';

  public studentsList: User[] = [];

  constructor(private store: Store<MessageStore>, private userApiService: UserApiService) {}

  public ngOnInit(): void {
    // TODO: IS PENDING TRUE
    this.userApiService.getStudentsForSchoolSubject$(this.subjectId).pipe(
      take(1),
      catchError((err) => of(err.status))
    ).subscribe((res) => {
      // TODO: IS PENDING FALSE
      if (res.users) {
        this.studentsList = res.users;
      } else {
        this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the list of students (error code :${res})`}}));
      }
    });
  }
}
