import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatVerticalStepper} from '@angular/material/stepper';
import {Store} from '@ngrx/store';
import {AssignmentApiService} from '../../services/index';
import {AssignmentStore, clearMessages, createAssignmentFromApi} from '../../store/index';


@Component({
  selector: 'app-assignments-add',
  templateUrl: './assignments-add.component.html',
  styleUrls: ['./assignments-add.component.scss']
})
export class AssignmentsAddComponent {
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
