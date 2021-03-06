import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AssignmentApiService} from '../../services/index';
import {AssignmentStore, clearMessages, createAssignmentFromApi} from '../../store/index';


@Component({
  selector: 'app-assignments-add',
  templateUrl: './assignments-add.component.html',
  styleUrls: ['./assignments-add.component.scss']
})
export class AssignmentsAddComponent {
  public assignmentForm: FormGroup;
  public today: Date;

  @ViewChild('formDirective', {static: false})
  private formDirective?: NgForm;

  constructor(private store: Store<AssignmentStore>, private assignmentApiService: AssignmentApiService) {
    this.today = new Date();
    this.assignmentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      submissionDate: new FormControl('', [Validators.required]),
      remarks: new FormControl(''),
    });
  }

  public async createAssignment(): Promise<void> {
    this.store.dispatch(clearMessages());
    const name = this.assignmentForm.get('name')?.value;
    const subjectId = this.assignmentForm.get('subject')?.value;
    const submissionDate = this.assignmentForm.get('submissionDate')?.value;
    const remarks = this.assignmentForm.get('remarks')?.value;

    if (name && subjectId && submissionDate) {
      const call = this.assignmentApiService.createAssignment$(name, subjectId, submissionDate, remarks);
      this.store.dispatch(createAssignmentFromApi({
        call
      }));

      try {
        await call;
        this.assignmentForm.reset();
        this.formDirective?.resetForm();
      } catch {}
    }
  }
}
