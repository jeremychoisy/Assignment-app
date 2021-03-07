import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {User} from '../../models/index';
import {UserApiService} from '../../services/index';
import {MessageStore, pushMessage} from '../../store/index';

@Component({
  selector: 'app-student-list-by-school-subject',
  templateUrl: './student-list-by-school-subject.component.html',
  styleUrls: ['./student-list-by-school-subject.scss']
})
export class StudentListBySchoolSubjectComponent implements OnInit, AfterViewInit {
  @Input()
  public subjectId = '';

  public studentsList: User[] = [];

  private isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();

  public displayedColumns: string[] = ['avatar', 'email', 'name'];

  private page = 1;
  private limit = 20;
  private totalCount = 0;

  @ViewChild('tableContainer', {static: false})
  private tableContainer?: ElementRef;

  constructor(private store: Store<MessageStore>, private userApiService: UserApiService) {}

  private refreshStudentsList(): void {
    this.userApiService.getStudentsForSchoolSubject$(this.subjectId, this.page, this.limit).pipe(
      take(1),
      catchError((err) => of(err.status))
    ).subscribe((res) => {
      this.isLoadingSubject$.next(false);
      if (res.users) {
        if (res.users.length) {
          this.studentsList = this.studentsList.concat(...res.users);
          this.totalCount = res.totalCount;
        }
      } else {
        this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the list of students (error code :${res})`}}));
      }
    });
  }

  public ngOnInit(): void {
    this.isLoadingSubject$.next(true);
    this.refreshStudentsList();
  }

  public ngAfterViewInit(): void {
    this.setScrollObservable();
  }

  public setScrollObservable(): void {
    if (this.tableContainer?.nativeElement) {
      fromEvent(this.tableContainer.nativeElement, 'scroll').pipe(
        debounceTime(50),
        distinctUntilChanged()
      ).subscribe((e: any) => {
        const tableViewHeight = e.target.offsetHeight;
        const tableScrollHeight = e.target.scrollHeight;
        const scrollLocation = e.target.scrollTop;

        // If the user has scrolled within 50px of the bottom, add more data
        const buffer = 50;
        const limit = tableScrollHeight - tableViewHeight - buffer;
        if (scrollLocation > limit && (this.studentsList.length < this.totalCount)) {
          this.page ++;
          this.refreshStudentsList();
        }
      });
    }
  }
}
