import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatVerticalStepper} from '@angular/material/stepper';
import {select, Store} from '@ngrx/store';
import {SchoolSubject} from '../../models';
import {AssignmentApiService} from '../../services/index';
import {AssignmentStore, clearMessages, createAssignmentFromApi, selectAssignmentsStoreLoadingStatus} from '../../store/index';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-assignments-add',
  templateUrl: './assignments-add.component.html',
  styleUrls: ['./assignments-add.component.scss']
})
export class AssignmentsAddComponent implements OnInit {
  @Input()
  public subjects: SchoolSubject[] = [];

  public isLoading$: Observable<boolean>;

  public nameForm: FormGroup;
  public subjectForm: FormGroup;
  public submissionDateForm: FormGroup;
  public remarksForm: FormGroup;
  public today: Date;

  @ViewChild('nameFormDirective', {static: false})
  private nameFormDirective?: NgForm;

  @ViewChild('subjectFormDirective', {static: false})
  private subjectFormDirective?: NgForm;

  @ViewChild('submissionDateFormDirective', {static: false})
  private submissionDateFormDirective?: NgForm;

  @ViewChild('remarksFormDirective', {static: false})
  private remarksFormDirective?: NgForm;

  @ViewChild('stepper', {static: false})
  private stepper?: MatVerticalStepper;

  constructor(private store: Store<AssignmentStore>, private assignmentApiService: AssignmentApiService) {
    this.today = new Date();
    this.nameForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
    this.subjectForm = new FormGroup({
      subject: new FormControl('', [Validators.required])
    });
    this.submissionDateForm = new FormGroup({
      submissionDate: new FormControl('', [Validators.required])
    });
    this.remarksForm = new FormGroup({
      remarks: new FormControl('')
    });
    this.isLoading$ = this.store.pipe(select(selectAssignmentsStoreLoadingStatus));
  }

  private resetForms(): void {
    this.nameForm.reset();
    this.nameFormDirective?.resetForm();
    this.subjectForm.reset();
    this.subjectFormDirective?.resetForm();
    this.submissionDateForm.reset();
    this.submissionDateFormDirective?.resetForm();
    this.remarksForm.reset();
    this.stepper?.reset();
  }

  ngOnInit(): void {
    const subjectFormControl = this.subjectForm.get('subject');
    if (subjectFormControl && this.subjects[0]?._id) {
      subjectFormControl.setValue(this.subjects[0]._id);
    }
  }

  public async createAssignment(): Promise<void> {
    this.store.dispatch(clearMessages());
    const name = this.nameForm.get('name')?.value;
    const subjectId = this.subjectForm.get('subject')?.value;
    const submissionDate = this.submissionDateForm.get('submissionDate')?.value;
    const remarks = this.remarksForm.get('remarks')?.value;

    if (name && subjectId && submissionDate) {
      const call = this.assignmentApiService.createAssignment$(name, subjectId, submissionDate, remarks);
      this.store.dispatch(createAssignmentFromApi({
        call
      }));

      try {
        await call;
        this.resetForms();
      } catch {}
    }
  }
}
