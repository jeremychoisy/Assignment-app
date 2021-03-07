import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {BehaviorSubject, fromEvent, Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {User} from '../../models/index';
import {UserApiService} from '../../services/index';
import {clearMessages, MessageStore, pushMessage} from '../../store/index';
import {UpdateStudentStatusComponent} from '../update-student-status/update-student-status.component';

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

  public displayedColumns: string[] = ['avatar', 'email', 'name', 'status'];

  private page = 1;
  private limit = 20;
  private totalCount = 0;

  @ViewChild('tableContainer', {static: false})
  private tableContainer?: ElementRef;

  constructor(private store: Store<MessageStore>, private userApiService: UserApiService, private dialog: MatDialog) {}

  private refreshStudentsList(shouldConcat: boolean = true): void {
    this.userApiService.getStudentsForSchoolSubject$(this.subjectId, this.page, this.limit).pipe(
      take(1),
      catchError((err) => of(err.status))
    ).subscribe((res) => {
      this.isLoadingSubject$.next(false);
      if (res.users) {
        if (res.users.length) {
          const result: User[] = shouldConcat ? this.studentsList.concat(...res.users) : res.users;
          this.studentsList = result.sort(((a, b) => {
            const isAPending = this.isUserWaitingForApproval(a);
            const isBPending = this.isUserWaitingForApproval(b);
            return isAPending ? -1 : isBPending ? 1 : -1;
          }));
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

  private isUserWaitingForApproval(user: User): boolean {
    return !user.subjects.find((subject) => subject._id === this.subjectId);
  }

  private setScrollObservable(): void {
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

  private handleAfterClosedDialogEvent(res: any): void {
    if (typeof res === 'string') {
      this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while updating the list of students (error code :${res})`}}));
    } else {
      this.refreshStudentsList(false);
    }
  }

  public openDialog(user: User): void {
    if (this.isUserWaitingForApproval(user)) {
      this.store.dispatch(clearMessages());
      const dialogRef = this.dialog.open(UpdateStudentStatusComponent, {width: '40rem'});
      dialogRef.afterClosed().subscribe((isApproved) => {
        if (isApproved !== undefined && user._id) {
          this.isLoadingSubject$.next(true);
          if (isApproved) {
            this.userApiService.approveStudent$(user._id, this.subjectId).pipe(
              take(1),
              catchError((err) => of(err.status))
            ).subscribe((res) => {
              this.handleAfterClosedDialogEvent(res);
            });
          } else {
            this.userApiService.declineStudent$(user._id, this.subjectId).pipe(
              take(1),
              catchError((err) => of(err.status))
            ).subscribe((res) => {
              this.handleAfterClosedDialogEvent(res);
            });
          }
        }
      });
    }
  }
}
