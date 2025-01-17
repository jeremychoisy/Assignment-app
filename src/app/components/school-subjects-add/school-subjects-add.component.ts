import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {SchoolSubjectApiService} from '../../services/index';
import {clearMessages, MessageStore, pushMessage} from '../../store/index';

@Component({
  selector: 'app-school-subjects-add',
  templateUrl: './school-subjects-add.component.html',
  styleUrls: ['./school-subjects-add.component.scss']
})
export class SchoolSubjectsAddComponent {
  public subjectForm: FormGroup;

  private avatarUrl$: Subject<string | undefined> = new Subject<string | undefined>();

  private submitTriggerSubject$: Subject<boolean> = new Subject<boolean>();
  public submitTrigger$: Observable<boolean> = this.submitTriggerSubject$.asObservable();

  public isLoadingSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject$.asObservable();

  @ViewChild('formDirective', {static: false})
  private formDirective?: NgForm;

  constructor(private store: Store<MessageStore>, private schoolSubjectApiService: SchoolSubjectApiService) {
    this.subjectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  public onUrlReceived(url?: string): void {
    this.avatarUrl$.next(url);
  }

  public createSubject(): void {
    this.isLoadingSubject$.next(true);
    this.store.dispatch(clearMessages());
    const name = this.subjectForm.get('name')?.value;
    this.avatarUrl$.pipe(
      take(1)
    ).subscribe((avatarUrl) => {
      this.schoolSubjectApiService.createSubject$(name, avatarUrl).pipe(
        take(1),
        catchError((err) => of(err.status))
      ).subscribe((res: any) => {
        this.isLoadingSubject$.next(false);
        if (res.subject) {
          this.store.dispatch(pushMessage({message: {type: 'success', content: `The subject '${res.subject.name}' has been successfully created.`}}));
          this.subjectForm.reset();
          this.formDirective?.resetForm();
        } else {
          this.store.dispatch(pushMessage({message: {type: 'error', content: `Something went wrong while creating the subject (error code :${res})`}}));
        }
      });
    });
    this.submitTriggerSubject$.next(true);
  }
}
