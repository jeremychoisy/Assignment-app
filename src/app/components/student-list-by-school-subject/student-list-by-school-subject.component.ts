import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {User} from '../../models/index';
import {UserApiService} from '../../services/index';
import {MessageStore, pushMessage} from '../../store/index';

@Component({
  selector: 'app-student-list-by-school-subject',
  templateUrl: './student-list-by-school-subject.component.html',
  styleUrls: ['./student-list-by-school-subject.scss']
})
export class StudentListBySchoolSubjectComponent implements OnInit {
  @Input()
  public subjectId = '';

  public studentsList: User[] = [];

  private isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();

  public displayedColumns: string[] = ['avatar', 'email', 'name'];

  constructor(private store: Store<MessageStore>, private userApiService: UserApiService) {}

  private refreshStudentsList(): void {
    this.isLoadingSubject$.next(true);
    this.userApiService.getStudentsForSchoolSubject$(this.subjectId).pipe(
      take(1),
      catchError((err) => of(err.status))
    ).subscribe((res) => {
      this.isLoadingSubject$.next(false);
      if (res.users) {
        this.studentsList = res.users;
      } else {
        this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the list of students (error code :${res})`}}));
      }
    });
  }

  public ngOnInit(): void {
    this.refreshStudentsList();
  }
}
