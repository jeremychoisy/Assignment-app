import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';
import {SchoolSubject, User} from '../../models/index';
import {SchoolSubjectApiService, UserApiService} from '../../services/index';
import {
  clearMessages, getUserFromApi,
  MessageStore,
  pushMessage,
  selectUser, selectUserStoreLoadingStatus,
  UserStore
} from '../../store/index';
import {ApplySubjectComponent} from '../dialogs/apply-subject/apply-subject.component';

@Component({
  selector: 'app-school-subject-list-student',
  templateUrl: './school-subject-list-student.component.html',
  styleUrls: ['./school-subject-list-student.component.scss']
})
export class SchoolSubjectListStudentComponent {
  public user$: Observable<User>;
  public subjects: SchoolSubject[] = [];

  private isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['icon', 'name', 'teacher', 'status'];

  constructor(private store: Store<UserStore & MessageStore>, private userApiService: UserApiService, private schoolSubjectApiService: SchoolSubjectApiService, private dialog: MatDialog) {
    this.store.dispatch(clearMessages());
    this.user$ = this.store.pipe(
      select(selectUser),
      filter((user): user is User => !!user)
    );
    this.isLoading$ = combineLatest([
      this.isLoadingSubject$,
      this.store.pipe(select(selectUserStoreLoadingStatus))
    ]).pipe(
      map((isLoadingStatuses) => isLoadingStatuses.some((isLoadingStatus) => isLoadingStatus))
    );
    this.isLoadingSubject$.next(true);
    this.refreshSubjects();
  }

  private refreshSubjects(): void {
    this.schoolSubjectApiService.getSubjects$().pipe(
      take(1),
      catchError((err) => of(err.status))
    ).subscribe((res: any) => {
      if (typeof res === 'string') {
        this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while fetching the list of subjects (error code :${res})`}}));
      } else {
        if (res.subjects?.length) {
          this.user$.pipe(take(1)).subscribe((user) => {
            this.subjects = res.subjects.sort(((a: SchoolSubject, b: SchoolSubject) => {
              const isAPartOfSubjects = this.isSubjectPartOfTheUserSubjects(user, a);
              const isBPartOfSubjects = this.isSubjectPartOfTheUserSubjects(user, b);
              const isAPartOfRequestedSubjects = this.isSubjectPartOfTheUserRequestedSubjects(user, a);
              const isBPartOfRequestedSubjects = this.isSubjectPartOfTheUserRequestedSubjects(user, b);
              return isAPartOfRequestedSubjects ? -1 : isBPartOfRequestedSubjects ? 1 : isAPartOfSubjects ? -1 : isBPartOfSubjects ? 1 : -1;
            }));
          });
        }
      }
      this.isLoadingSubject$.next(false);
    });
  }

  private isSubjectPartOfTheUserSubjects(user: User, subject: SchoolSubject): boolean {
    return !!user.subjects.find((currentSubject) => currentSubject._id === subject._id);
  }

  private isSubjectPartOfTheUserRequestedSubjects(user: User, subject: SchoolSubject): boolean {
    return !!user.requestedSubjects.find((currentSubject) => currentSubject._id === subject._id);
  }

  private isClickable(user: User, subject: SchoolSubject): boolean {
    return !this.isSubjectPartOfTheUserSubjects(user, subject) && !this.isSubjectPartOfTheUserRequestedSubjects(user, subject);
  }

  public openDialog(user: User, schoolSubject: SchoolSubject): void {
    if (this.isClickable(user, schoolSubject)) {
      this.store.dispatch(clearMessages());
      const dialogRef = this.dialog.open(ApplySubjectComponent, {
        width: '40rem'
      });
      dialogRef.afterClosed().subscribe((isAccepted) => {
        if (isAccepted && schoolSubject._id) {
          this.isLoadingSubject$.next(true);
          this.userApiService.applyStudent$(schoolSubject._id).pipe(
            take(1),
            catchError((err) => of(err.status))
          ).subscribe(async (res: any) => {
            if (typeof res === 'string') {
              this.store.dispatch(pushMessage({
                message: {
                  type: 'error',
                  content: `Something went wrong while creating the application (error code :${res})`
                }
              }));
            } else {
              this.store.dispatch(pushMessage({
                message: {
                  type: 'success',
                  content: 'The application has been successfully created.'
                }
              }));
              if (user._id) {
                const call = this.userApiService.getUser$(user._id);
                this.store.dispatch(getUserFromApi({
                  call
                }));
                try {
                  await call;
                  this.refreshSubjects();
                } catch {}
              }
            }
          });
        }
      });
    }
  }
}
