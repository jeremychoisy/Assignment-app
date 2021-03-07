import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {catchError, filter, map, take} from 'rxjs/operators';
import {SchoolSubject, User} from '../../models/index';
import {SchoolSubjectApiService, UserApiService} from '../../services/index';
import {
  clearMessages,
  getUserFromApi,
  MessageStore,
  pushMessage,
  selectUser,
  selectUserStoreLoadingStatus,
  UserStore
} from '../../store/index';
import {SchoolSubjectEditComponent} from '../school-subject-edit/school-subject-edit.component';

@Component({
  selector: 'app-school-subject-list',
  templateUrl: './school-subject-list.component.html',
  styleUrls: ['./school-subject-list.component.scss']
})
export class SchoolSubjectListComponent {
  public user$: Observable<User>;
  public subject$: Observable<SchoolSubject[]>;

  private isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean>;

  public isStoreLoading$: Observable<boolean>;

  public displayedColumns: string[] = ['picture', 'name'];

  constructor(private store: Store<UserStore & MessageStore>, private userApiService: UserApiService, private schoolSubjectApiService: SchoolSubjectApiService, private dialog: MatDialog) {
    this.user$ = this.store.pipe(
      select(selectUser),
      filter((user): user is User => !!user)
    );
    this.subject$ = this.user$.pipe(
      map((user) => user.subjects)
    );
    this.isStoreLoading$ = this.store.pipe(
      select(selectUserStoreLoadingStatus)
    );
    this.isLoading$ = combineLatest([
      this.isLoadingSubject$,
      this.isStoreLoading$
    ]).pipe(
      map(isLoadingStatuses => isLoadingStatuses.some((isLoadingStatus) => isLoadingStatus))
    );
    this.refreshUser();
  }

  private refreshUser(): void {
    this.user$.pipe(take(1)).subscribe((user) => {
      if (user._id) {
        this.store.dispatch(getUserFromApi({
          call: this.userApiService.getUser$(user._id)
        }));
      }
    });
  }

  private handleRes(res: any, isAnUpdate = true): void {
    // updateRes being a string means something went wrong and this is the error status
    if (typeof res === 'string') {
      this.store.dispatch(pushMessage({
        message: {
          type: 'error',
          content: 'Something went wrong while ' + (isAnUpdate ? 'updating' : 'deleting') + `the subject (error code :${res})`
        }
      }));
    } else {
      this.store.dispatch(pushMessage({
        message: {
          type: 'success',
          content: `The subject has been successfully ` + (isAnUpdate ? 'updated' : 'deleted') + '.'
        }
      }));
      this.isLoadingSubject$.next(false);
      this.refreshUser();
    }
  }

  public openDialog(schoolSubject: SchoolSubject): void {
    this.store.dispatch(clearMessages());
    const dialogRef = this.dialog.open(SchoolSubjectEditComponent, {
      data: {
        schoolSubject
      },
      width: '40rem'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'delete') {
        this.isLoadingSubject$.next(true);
        if (schoolSubject._id) {
          this.schoolSubjectApiService.deleteSubject$(schoolSubject._id).pipe(
            take(1),
          ).subscribe((deleteRes: any) => {
            this.handleRes(deleteRes, false);
          });
        }
      } else if (res) {
        this.isLoadingSubject$.next(true);
        if (schoolSubject._id) {
          this.schoolSubjectApiService.updateSubject$(schoolSubject._id, res.name, res.subjectPictureUrl).pipe(
            take(1),
            catchError((err) => of(err.status))
          ).subscribe((updateRes: any) => {
            this.handleRes(updateRes);
          });
        }
      }
    });
  }
}
